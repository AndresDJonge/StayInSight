import { Slider } from '@mui/material';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default ({ eventKey }) => {
    const [valuetext, setV] = useState("test")
    return <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Season</Accordion.Header>
        <Accordion.Body>
            <Slider
                aria-label="Temperature"
                defaultValue={25}
                getAriaValueText={() => valuetext}
                valueLabelDisplay="auto"
                step={25}
                marks
                min={0}
                max={100}
            />
        </Accordion.Body>
    </Accordion.Item>
}
