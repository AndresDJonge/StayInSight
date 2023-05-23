import Accordion from "react-bootstrap/Accordion";
import {Slider} from "@mui/material";
import {useEffect, useState} from 'react'
import {Card} from "react-bootstrap";
import {CustomToggle} from "../CustomToggle";
import RadiusBarChart from "../RadiusBarChart";
import {getAveragePriceByListingIds} from "../../azure";

export default function ({ eventKey, filters, setFilters, staticData, setStaticData, filteredData, setFilteredData, marker, setMarker }) {
    const [value, setValue] = useState(40);
    const [priceBins, setPriceBins] = useState(null);
    const minDistance = 0;
    const maxDistance = 40;
/*
    useEffect(() => {
        getGroupedData(filteredData)
    }, [])
*/
    useEffect(() => {
        updateFilter(value)
        getGroupedData(filteredData)
    }, [marker])

    const marks = [
        { value: 1, label: '1km' },
        { value: 5, label: '5km' },
        { value: 10, label: '10km' },
        { value: 15, label: '15km' },
        { value: 20, label: '20km' },
        { value: 30, label: '30km' },
        { value: 40, label: '40+km' },
    ];

    function updateFilter(newValue){
        filters = filters.filter(f => f.id !== eventKey)
        filters.push({
            id: eventKey,
            func: bnb => newValue < 40 ? calculateDistance(bnb.latitude, bnb.longitude, marker) <= newValue : bnb
        })

        setFilters([...filters])
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
        updateFilter(newValue)
    }

    function groupByDistance(data) {
        return data.reduce((groups, item) => {
            const dist = calculateDistance(item.latitude, item.longitude, marker)
            const groupIndex = getDistanceIndex(dist)
            const group = (groups[groupIndex] || [])
            group.push(item)
            groups[groupIndex] = group
            return groups;
        }, {});
    }

    function getPriceByCapacity(capacity) {
        const candidates = filteredData.filter(item =>
            Number(getDistanceIndex(calculateDistance(item.latitude, item.longitude, marker))) === Number(capacity)).map(i => i.id);
        return getAveragePriceByListingIds(candidates);
    }

    function getGroupedData(data) {
        const distanceGroups = groupByDistance(data)
        const promises = Object.keys(distanceGroups).map(async k => {
            const result = await getPriceByCapacity(k)
            return {
                distance: k,
                value: result[0].$1
            };
        });
        Promise.all(promises).then(data => setPriceBins(data))
    }

    return (
        <Card>
            <Card.Header className='py-0 text-center'>
                <Slider
                    style={{ color: '#4E5154', width: '90%' }}
                    className='mt-4'
                    aria-label='Radius'
                    defaultValue={value}
                    value={value}
                    onChange={handleChange}
                    valueLabelFormat={valueRadiusText}
                    valueLabelDisplay='auto'
                    step={1}
                    marks={marks}
                    min={minDistance}
                    max={maxDistance}
                />
                <CustomToggle eventKey={eventKey} />
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    <RadiusBarChart data={priceBins} selectedRange={value} />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

function calculateDistance(lat1, lon1, marker) {
    let lat2, lon2

    if (marker.latitude && marker.longitude) {
        lat2 = marker.latitude
        lon2 = marker.longitude
    } else {
        lat2 = 34.052235
        lon2 = -118.243683
    }

    let R = 6371
    let dLat = toRad(lat2 - lat1);
    let dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(val) {
    return val * Math.PI / 180;
}

function valueRadiusText(value) {
    if (value === 40)
        return `40+km`
    return `${value}km`
}

function getDistanceIndex(dist) {
    dist = Math.floor(dist / 5) * 5
    dist = dist >= 40 ? 40 : dist
    return dist
    // return  dist >= 40 ? 40 : Math.floor(dist)
}
