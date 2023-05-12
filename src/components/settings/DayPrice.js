import Accordion from "react-bootstrap/Accordion";
import {Slider} from "@mui/material";
import {useState} from 'react'
import {Card} from "react-bootstrap";
import {CustomToggle} from "../CustomToggle";
import PricePerDayChart from "../PricePerDayChart";

export default function({eventKey, data, filters, setFilters}) {
    // TODO: lees de pricerange dynamisch in voor de state
    const min = 20;
    const max = 220;
    const [value, setValue] = useState([min+20, max-20]);
    const minDistance = 30;

    function valuetext(value) {
        return `$ ${value}`;
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
    };

    return <Card>
        <Card.Header className='py-0'>
            <Slider
                style={{color: '#4E5154'}}
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
