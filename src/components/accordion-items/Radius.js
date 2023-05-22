import Accordion from "react-bootstrap/Accordion";
import { Slider } from "@mui/material";
import { useEffect, useState } from 'react'
import { Card } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";
import RadiusBarChart from "../RadiusBarChart";
import { groupSort } from "d3";
import { getAveragePriceByListingIds } from "../../azure";

export default function ({ eventKey, filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }) {
    const [value, setValue] = useState(40);
    const [priceBins, setPriceBins] = useState(null);
    const minDistance = 0;
    const maxDistance = 40;
    const centerLatitude = 34.052235;
    const centerLongitude = -118.243683;

    useEffect(() => {
        getGroupedData(filteredData)
    }, [])

    const marks = [
        { value: 1, label: '1km' },
        { value: 5, label: '5km' },
        { value: 10, label: '10km' },
        { value: 15, label: '15km' },
        { value: 20, label: '20km' },
        { value: 30, label: '30km' },
        { value: 40, label: '40+km' },
    ];

    const handleChange = (event, newValue, activeThumb) => {

        setValue(newValue)

        filters = filters.filter(f => f.id !== eventKey)
        filters.push({
            id: eventKey,
            func: bnb => newValue < 40 ? calculateDistance(bnb.latitude, bnb.longitude) <= newValue : bnb
        })

        setFilters([...filters])
    }

    function calculateDistance(lat1, lon1, lat2 = centerLatitude, lon2 = centerLongitude) {
        var R = 6371
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
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

    function groupByDistance(data) {
        return data.reduce((groups, item) => {
            const dist = calculateDistance(item.latitude, item.longitude)
            console.log("Distance: " + dist)
            const groupIndex = getDistanceIndex(dist)
            const group = (groups[groupIndex] || [])
            group.push(item)
            groups[groupIndex] = group
            return groups;
        }, {});
    }

    function getPriceByCapacity(capacity) {
        const candidates = filteredData.filter(item =>
            Number(getDistanceIndex(calculateDistance(item.latitude, item.longitude))) === Number(capacity)).map(i => i.id);
        console.log("Candidat" + candidates)
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

    return <Card>
        <Card.Header className='py-0 text-center'>
            <Slider
                style={{ color: '#4E5154', width: '90%' }}
                className='mt-4'
                aria-label='Radius'
                defaultValue={value}
                value={value}
                onChange={handleChange}
                valueLabelFormat={valueRadiusText}
                valueLabelDisplay='on'
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
}
