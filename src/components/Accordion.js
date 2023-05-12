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
    const [filters, setFilters] = useState([])

    /* This is done to only make the accordion scrollable */
    const [maxHeight, setMaxHeight] = useState(400);

    // This filters the data based on all the filters of the accordion
    // To add a filter, you need an object { id: eventkey, func: filter predicate }
    const applyFilters = () => {
        const filteredData = data.filter(item => filters.every(f => f.func(item)))
        setData(filteredData)
    }

    useEffect(() => {
        applyFilters()
    }, [filters])

    useEffect(() => {
        const container = document.getElementById('accordion');
        const top = container.getBoundingClientRect().top;
        const remainingHeight = window.innerHeight - top;
        setMaxHeight(remainingHeight);
    }, []);

    return (
        <Accordion id='accordion' defaultActiveKey={key} className='h-100' style={{ maxHeight: `${maxHeight}px`, overflowY: 'scroll' }}>
            <Season eventKey={'0'}/>
            <Rooms eventKey={'1'} data={data} filters={filters} setFilters={setFilters}/>
            <TypeDay eventKey={'2'}/>
            <Radius eventKey={'3'}/>
            <Capacity eventKey={'4'} data={data} filters={filters} setFilters={setFilters}/>
            <DayPrice eventKey={'5'} data={data} setFilters={setFilters}/>
        </Accordion>
    );
}
