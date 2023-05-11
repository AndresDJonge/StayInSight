import Accordion from 'react-bootstrap/Accordion';
import Season from "./settings/Season";
import Rooms from "./settings/Rooms";
import TypeDay from "./settings/TypeDay";
import Radius from "./settings/Radius";
import Capacity from "./settings/Capacity";
import DayPrice from "./settings/DayPrice";
import {useEffect, useState} from "react";

export default function ({data, setData}) {
    const [key, setKey] = useState('4');

    /* This is done to only make the accordion scrollable */
    const [maxHeight, setMaxHeight] = useState(400);

    useEffect(() => {
        const container = document.getElementById('accordion');
        const top = container.getBoundingClientRect().top;
        const remainingHeight = window.innerHeight - top;
        setMaxHeight(remainingHeight);
    }, []);

    return (
        <Accordion id='accordion' defaultActiveKey={key} className='h-100' style={{ maxHeight: `${maxHeight}px`, overflowY: 'scroll' }}>
            <Season eventKey={'0'}/>
            <Rooms eventKey={'1'}/>
            <TypeDay eventKey={'2'}/>
            <Radius eventKey={'3'}/>
            <Capacity eventKey={'4'} data={data} setData={setData}/>
            <DayPrice eventKey={'5'} data={data} setData={setData}/>
        </Accordion>
    );
}
