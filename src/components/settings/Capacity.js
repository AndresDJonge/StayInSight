import Accordion from "react-bootstrap/Accordion";
import {useState} from 'react'
import {Slider} from "@mui/material";

export default function({eventKey}) {
    // TODO: lees de personrange dynamisch in voor de state
    const min = 1;
    const max = 5;
    const [value, setValue] = useState([min+1, max-1]);
    const minDistance = 1;

    function valuetext(value) {
        return value > 1 ? `${value} persons` : `${value} person`;
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
    };

    return <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Person Capacity</Accordion.Header>
        <Accordion.Body>
            <Slider
                style={{color: '#4E5154'}}
                className='mt-4 my-2'
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
        </Accordion.Body>
    </Accordion.Item>
}
