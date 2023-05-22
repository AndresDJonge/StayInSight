import Accordion from "react-bootstrap/Accordion";
import { Slider } from "@mui/material";
import { useState } from 'react'
import { Card } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";

export default function ({ eventKey, filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }) {
    const [valuetext, setV] = useState("test")

    const marks = [
        {
            value: 1,
            label: '1km',
        },
        {
            value: 5,
            label: '5km',
        },
        {
            value: 10,
            label: '10km',
        },
        {
            value: 15,
            label: '15km',
        },
        {
            value: 20,
            label: '20km',
        },
    ];

    return (
        <Card>
            <Card.Header className='py-0 text-center'>
                <div className='lead'>Range outside marker</div>
                <Slider
                    style={{ color: '#4E5154', width: '90%' }}
                    className='mt-4'
                    aria-label='Radius'
                    defaultValue={5}
                    getAriaValueText={() => valuetext}
                    valueLabelDisplay='auto'
                    step={1}
                    marks={marks}
                    min={1}
                    max={20}
                />
                <CustomToggle eventKey={eventKey} />
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    TODO
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
