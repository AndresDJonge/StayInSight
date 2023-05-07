import Accordion from "react-bootstrap/Accordion";
import {Slider} from "@mui/material";
import {useState} from 'react'

export default function({eventKey}) {
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

    return <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Radius</Accordion.Header>
        <Accordion.Body>
            <Slider
                style={{color: '#4E5154'}}
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
        </Accordion.Body>
    </Accordion.Item>
}
