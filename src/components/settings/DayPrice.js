import Accordion from "react-bootstrap/Accordion";
import {Slider} from "@mui/material";
import {useEffect, useState} from 'react'
import {Card} from "react-bootstrap";
import {CustomToggle} from "../CustomToggle";
import PricePerDayChart from "../PricePerDayChart";
import {getAveragePrices} from "../../azure";

export default function({eventKey, data, filters, setFilters}) {
    // TODO: lees de pricerange dynamisch in voor de state
    const [min, setMin] = useState(60);
    const [max, setMax] = useState(200);
    const [value, setValue] = useState([min+20, min+50]);
    const minDistance = 30;
    const [averagePrices, setAveragePrices] = useState(null);

    useEffect(() => {
        getGroupedData(data)
    }, [])

    useEffect(() => {
        console.log(averagePrices)
    }, [averagePrices])

    function valuetext(value) {
        return `$ ${value}`;
    }

    function inPriceRange(x, low, high){
        return low <= x && x <= high;
    }

    function getGroupedData(data) {
        getAveragePrices(data.map(i => i.id)).then(result => setAveragePrices(result))
    }

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }

        const validBnbs = averagePrices.filter(bnb => inPriceRange(bnb.avg_price, newValue[0], newValue[1])).map(bnb => bnb.listing_id)

        filters = filters.filter(f => f.id !== eventKey)
        filters.push({
            id: eventKey,
            func: bnb => validBnbs.includes(bnb.id)
        })
        setFilters([...filters]);
    };

    return <Card>
        <Card.Header className='py-0 text-center'>
            <Slider
                style={{color: '#4E5154', width: '90%'}}
                className='mt-5'
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelFormat={valuetext}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                disableSwap
                min={min}
                max={max}
            />
            <CustomToggle eventKey={eventKey}/>
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
                <PricePerDayChart data={data}/>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
}
