import Accordion from "react-bootstrap/Accordion";
import { Button, ButtonGroup, Card, ToggleButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { CustomToggle } from "../CustomToggle";
import drawChart from "../../d3/rooms-chart";

export default function ({ eventKey, data, filters, setFilters }) {
    const [radioValue, setRadioValue] = useState(1);
    const radios = [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '4+', value: 5 },
    ];

    const updateSelection = n => {
        filters = filters.filter(f => f.id !== `${eventKey}`)

        filters.push({
            id: `${eventKey}`,
            func: bnb => radioValue === 5 ? bnb.bedrooms > 4 : bnb.bedrooms === n
        })
        setRadioValue(n)

        setFilters([...filters])
    }

    useEffect(() => {
        console.log("data on rooms render: ", data)
        if (data !== null) {
            console.log("persons data:", data)

            const amounts = amountOfRoomSizes(data)
            console.log("grouped data:", amounts)
            drawChart(amounts, radioValue)
        }
    }, [data])

    return <Card>
        <Card.Header className='py-0 text-center'>
            <div className='lead'>Rooms</div>
            <ButtonGroup className='mt-3' aria-label='RoomsSelector'>
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
                        onChange={(e) => updateSelection(Number(e.currentTarget.value))}>
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <CustomToggle eventKey={eventKey} />
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
                <div id="rooms-chart"></div>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
}

const amountOfRoomSizes = data => {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    data.forEach(e => Number(e["bedrooms"]) <= 8 ? counts[e["bedrooms"]]++ : counts[e["bedrooms"]]++);
    return counts
}