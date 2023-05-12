import Accordion from "react-bootstrap/Accordion";
import {useState} from 'react'
import {Slider} from "@mui/material";
import {Card} from "react-bootstrap";
import {CustomToggle} from "../CustomToggle";
import PersonBarChart from "../PersonBarChart";

export default function ({eventKey, data, filters, setFilters}) {
    // TODO: lees de personrange dynamisch in voor de state
    const min = 1;
    const max = 8;
    const [value, setValue] = useState([min + 1, max - 1]);
    const minDistance = 0;

    function valuetext(value) {
        if (value === 8)
            return '8+ persons'
        if (value === 1)
            return `${value} person`
        return `${value} persons`
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

        // First, remove every filter that has been previously set by this component
        filters = filters.filter(f => f.id !== `${eventKey}_1`)
        filters = filters.filter(f => f.id !== `${eventKey}_2`)

        // Second, add new filters to the global filters object
        filters.push({
            id: `${eventKey}_1`,
            func: bnb => bnb.accommodates >= newValue[0]
        })
        filters.push({
            id: `${eventKey}_2`,
            func: bnb => {
                return newValue[1] < 8 ? bnb.accommodates <= newValue[1] : bnb;
            }
        })

        // Finally, set the filters for the accordion
        setFilters([...filters])
    };

    return <Card>
        <Card.Header className='py-0 text-center'>
            <Slider
                style={{color: '#4E5154', width: '90%'}}
                className='mt-5'
                getAriaLabel={() => 'Person capacity'}
                value={value}
                onChange={handleChange}
                valueLabelFormat={valuetext}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                disableSwap
                min={min}
                max={max}
            />
            <CustomToggle eventKey={eventKey}/>
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
                <PersonBarChart data={data} selectedRange={value}/>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
}
