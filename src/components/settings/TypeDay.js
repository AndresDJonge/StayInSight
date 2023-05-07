import Accordion from "react-bootstrap/Accordion";
import {useState} from 'react';
import {ButtonGroup, ToggleButton} from "react-bootstrap";

export default function({eventKey}) {
    const [radioValue, setRadioValue] = useState(1);
    const radios = [
        {name: 'Weekday', value: 1},
        {name: 'Weekend', value: 2},
    ];

    return <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Type of Day</Accordion.Header>
        <Accordion.Body className='text-center'>
            <ButtonGroup aria-label='RoomsSelector'>
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
        </Accordion.Body>
    </Accordion.Item>
}
