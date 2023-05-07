import Accordion from 'react-bootstrap/Accordion';
import Season from "./settings/Season";
import Rooms from "./settings/Rooms";
import TypeDay from "./settings/TypeDay";
import Radius from "./settings/Radius";
import Capacity from "./settings/Capacity";
import DayPrice from "./settings/DayPrice";
import {useState} from "react";

export default function ({data, setData}) {
    const [key, setKey] = useState('0');

    return (
        <Accordion defaultActiveKey={key}>
            <Season eventKey={'0'}/>
            <Rooms eventKey={'1'}/>
            <TypeDay eventKey={'2'}/>
            <Radius eventKey={'3'}/>
            <Capacity eventKey={'4'}/>
            <DayPrice eventKey={'5'}/>
        </Accordion>
    );
}
