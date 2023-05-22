import cities from "./data/cities_coords";
import _data from "./data/cities/los_angeles.json";
import borders from "./data/borders/amsterdam";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Map from "./components/Map";
import "./style/App.css"
import Accordion from "./components/Accordion";
import Summary from "./components/Summary";


export default () => {
    // We need to make a separation between the actual data and what the map shows
    // because otherwise the filtered data is gone forever!
    // So always pass 'data' as the actual data, but the setFilteredData as a filter to the components!!!
    const [staticData, setStaticDataInternal] = useState(_data)
    const [filteredData, setFilteredDataInternal] = useState(_data)

    const [city, setCity] = useState(cities.find(x => x.key === 'los angeles'))

    const setFilteredData = v => {
        console.log("Filtered data:", v)
        setFilteredDataInternal(v)
    }

    const setStaticData = v => {
        setStaticDataInternal(v)

        const copy = [...filteredData]
        copy.map(e => v.find(static_e => static_e["id"] === e["id"]))
        setFilteredData(copy)
    }

    const removeWaypoint = (id) => {
        console.log("App, removing ", id)
        setFilteredData(staticData.filter(wp => wp.id !== id))
    }


    return (
        <Container fluid>
            <Row>
                <Col xs={8} className="p-0">
                    <Map {...{ borders, city, removeWaypoint, filteredData, setFilteredData }} />
                </Col>
                <Col xs={4}>
                    <Summary {...{ filteredData }} />
                    <Accordion {...{ staticData, setStaticData, filteredData, setFilteredData }} />
                </Col>
            </Row>
        </Container>
    )

}
