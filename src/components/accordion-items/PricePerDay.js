import Accordion from "react-bootstrap/Accordion";
import { Slider } from "@mui/material";
import { useEffect, useState } from 'react'
import { Card, Col, Row } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";
import { getAveragePrices } from "../../azure";
import "../../style/d3.css"
import dayprice, { updateChart } from "../../d3/price-per-day";

export default function ({ eventKey, filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }) {
    const min = 0;
    const max = 750;
    const [value, setValue] = useState([min, max]);
    const minDistance = 30;
    const [averagePrices, setAveragePrices] = useState(null);

    useEffect(() => {
        getGroupedData(staticData)
    }, [])

    function getGroupedData(staticData) {
        getAveragePrices(staticData.map(i => i.id)).then(result => {
            setAveragePrices(result)
        })
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

    useEffect(() => {
        if (averagePrices !== null) dayprice(averagePrices, value)
    }, [averagePrices])

    useEffect(() => {
        if (averagePrices !== null) updateChart(averagePrices, value)
    }, [...value])

    return (
        <Card>
            <Card.Header className='text-center'>
                <div className='lead'>Average price per day</div>
                <Row style={{ "width": "100%", marginLeft: "10px", paddingRight: "10px" }}>
                    <Col xs={11} style={{padding:"0px", margin:"0px"}}>
                        <Slider
                            style={{ color: '#4E5154', width: '100%' }}
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
                    </Col>
                    <Col xs={1}>
                        <CustomToggle eventKey={eventKey} />
                    </Col>
                </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body style={{ padding: '0px', overflow: 'hidden'}}>
                    <div id={"price-per-day"} />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

function valuetext(value) {
    return `$ ${value}`;
}

function inPriceRange(x, low, high) {
    return low <= x && x <= high;
}

