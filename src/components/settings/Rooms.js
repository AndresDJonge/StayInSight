import Accordion from "react-bootstrap/Accordion";
import {Button, ButtonGroup, ToggleButton} from "react-bootstrap";
import {useState} from "react";

export default function ({eventKey}) {
    const [radioValue, setRadioValue] = useState(1);
    const radios = [
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4},
        {name: '4+', value: 5},
    ];

    return <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Rooms</Accordion.Header>
        <Accordion.Body className='text-center'>
            <ButtonGroup aria-label='RoomsSelector'>
                {radios.map(radio => (
                    <ToggleButton
                        className='me-2 rounded'
                        key={radio.value}
                        id={`roomRadio-${radio.value}`}
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
