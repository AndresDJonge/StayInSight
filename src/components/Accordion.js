import Accordion from 'react-bootstrap/Accordion';
import Season from "./accordion-items/Season";
import Rooms from "./accordion-items/Rooms";
import TypeDay from "./accordion-items/TypeDay";
import Radius from "./accordion-items/Radius";
import Capacity from "./accordion-items/Capacity";
import DayPrice from "./accordion-items/PricePerDay";
import { useEffect, useState } from "react";

export default function ({ staticData, setStaticData, filteredData, setFilteredData, marker, setMarker }) {
    const [key, setKey] = useState(null);
    const [filters, setFilters] = useState([])

    // This filters the data based on all the filters of the accordion
    // To add a filter, you need an object { id: eventkey, func: filter predicate }
    const applyFilters = () => {
        const filteredData = staticData.filter(item => filters.every(f => f.func(item)))
        setFilteredData(filteredData)
    }

    useEffect(() => {
        applyFilters()
    }, [filters])

    useEffect(() => {
        applyFilters()
    }, [marker])

    return (
        <Accordion id='accordion' defaultActiveKey={key} className='pb-5' style={{ height: "100vh", overflowY: 'scroll' }}>
            <Season eventKey={'0'} {...{ filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }} />
            <Rooms eventKey={'1'} {...{ filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }} />
            <TypeDay eventKey={'2'} />
            <Radius eventKey={'3'} {...{ filters, setFilters, staticData, setStaticData, filteredData, setFilteredData, marker, setMarker }} />
            <Capacity eventKey={'4'} {...{ filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }} />
            <DayPrice eventKey={'5'} {...{ filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }} />
        </Accordion>
    );
}
