import Accordion from "react-bootstrap/Accordion";
import { Button, ButtonGroup, Card, ToggleButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { CustomToggle } from "../CustomToggle";
import drawChart from "../../d3/rooms";

export default function ({ eventKey, filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }) {
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

        console.log("before, n:", n, "radioValue:", radioValue)
        if (n !== -1 && n !== radioValue) {
            filters.push({
                id: `${eventKey}`,
                func: bnb => radioValue === 5 ? bnb.bedrooms > 4 : bnb.bedrooms === n
            })
            setRadioValue(n)
        }
        else setRadioValue(-1)

        setFilters([...filters])
    }

    useEffect(() => {
        //console.log("filteredData on rooms render: ", staticData)
        if (staticData !== null) {
            //console.log("persons data:", staticData)

            const amounts = amountOfRoomSizes(staticData)
            //console.log("grouped data:", amounts)
            drawChart(amounts, radioValue)
        }
    }, [staticData, radioValue])

    return (
        <Card>
            <Card.Header className='text-center'>
                <div className='lead'>Bedrooms per BnB</div>
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
                            onClick={_ => updateSelection(radio.value)}>
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <CustomToggle eventKey={eventKey} />
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    <div id="rooms"></div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

const amountOfRoomSizes = data => {
    var counts = []

    data.forEach(e => {
        if (!Object.keys(counts).includes("" + e["bedrooms"]))
            counts["" + e["bedrooms"]] = { "value": 0, "avg_price": 0 }

        counts["" + e["bedrooms"]]["value"]++
        counts["" + e["bedrooms"]]["avg_price"] += +e["avg_price"]
    });
    delete (counts[null])


    Object.keys(counts).forEach(key => counts[key]["avg_price"] = +counts[key]["avg_price"] / +counts[key]["value"])

    return [...Object.entries(counts).map(([k, v]) => {
        v["rooms"] = +k
        return v
    })]
}