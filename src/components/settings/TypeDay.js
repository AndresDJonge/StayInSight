import Accordion from "react-bootstrap/Accordion";
import { useState } from 'react';
import { ButtonGroup, Card, ToggleButton } from "react-bootstrap";
import { Slider } from "@mui/material";
import { CustomToggle } from "../CustomToggle";
import PersonBarChart from "../CapacityChart";

export default function ({ eventKey }) {
    const [radioValue, setRadioValue] = useState(1);
    const radios = [
        { name: 'Weekday', value: 1 },
        { name: 'Weekend', value: 2 },
    ];

    return <Card>
        <Card.Header className='py-0 text-center'>
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
                        onChange={(e) => setRadioValue(Number(e.currentTarget.value))}>
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <CustomToggle eventKey={eventKey} />
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>

            </Card.Body>
        </Accordion.Collapse>
    </Card>
}
