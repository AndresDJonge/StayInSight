import Accordion from "react-bootstrap/Accordion";
import {useEffect, useState} from 'react';
import { ButtonGroup, Card, ToggleButton, Col, Row } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";
import typeOfDay, {updateChart} from "../../d3/type-of-day";
import {getAveragePricePerTypeDay} from "../../azure";

export default function ({ eventKey, filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }) {
    const [radioValue, setRadioValue] = useState(null);
    const [dayBins, setDayBins] = useState(null);
    const radios = [
        { name: 'Weekday', value: 1 },
        { name: 'Weekend', value: 2 },
    ];

    useEffect(() => {
        if (dayBins !== null) typeOfDay(dayBins, radioValue)
    }, [dayBins])

    useEffect(() => {
        if (dayBins != null) updateChart(dayBins, radioValue)
    }, [radioValue])

    useEffect(() => {
        getGroupedData(setDayBins)
    }, [])

    return (
        <Card>
            <Card.Header className='text-center'>
                <Row style={{ "width": "100%", marginLeft: "10px", paddingRight: "10px" }}>
                    <Col xs={11} style={{padding:"0px", margin:"0px"}}>
                        <ButtonGroup className='mt-3' aria-label='TypeOfDaySelector'>
                            {radios.map(radio => (
                                <ToggleButton
                                    className='me-2 rounded'
                                    key={radio.value}
                                    id={`dayRadio-${radio.value}`}
                                    type="radio"
                                    variant={radioValue === radio.value ? 'dark' : 'outline-dark'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onClick={_ => setRadioValue(radio.value)}>
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Col>
                    <Col xs={1}>
                        <CustomToggle eventKey={eventKey} />
                    </Col>
                </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body style={{ padding: '0px', overflow: 'hidden'}}>
                    <div id='type-of-day'/>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

const dayMappings = [
    {
        day: 'Monday', value: 1
    },
    {
        day: 'Tuesday', value: 2
    },
    {
        day: 'Wednesday', value: 3
    },
    {
        day: 'Thursday', value: 4
    },
    {
        day: 'Friday', value: 5
    },
    {
        day: 'Saturday', value: 6
    },
    {
        day: 'Sunday', value: 0
    }
]

function getGroupedData(setDayBins){
    const dayBins = []
    const result = getAveragePricePerTypeDay();
    result.then(d => {
        d.forEach(el => {
            //console.log(el)
            const index = dayMappings.findIndex(item => Number(item.value) === Number(el.$1))
            dayBins.push({
                typeOfDay: dayMappings[index].day,
                value: el.$2
            })
        })
        setDayBins(dayBins)
    })
}
