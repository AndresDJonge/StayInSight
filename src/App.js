import cities from "./data/cities_coords";
import _data from "./data/cities/los_angeles.json";
import borders from "./data/borders/amsterdam";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Map from "./components/Map";
import Chart from "./components/DemoBarChart";
import "./style/App.css"
import Accordion from "./components/Accordion";
import Summary from "./components/Summary";
import { findByListingId } from "./azure";


export default () => {
    // We need to make a separation between the actual data and what the map shows
    // because otherwise the filtered data is gone forever!
    // So always pass 'data' as the actual data, but the setFilteredData as a filter to the components!!!
    const data = _data;
    const [filteredData, setFilteredData] = useState(_data)

    const [city, setCity] = useState(cities.find(x => x.key === 'los angeles'))

    const removeWaypoint = (id) => {
        console.log("App, removing ", id)
        setFilteredData(data.filter(wp => wp.id !== id))
    }

    useEffect(() => {
        (async () => {
            const results = await findByListingId(16027728)
            // console.log("results: ", results)
        })()
    }, [])
    useEffect(() => { console.log("render!"); document.getElementsByClassName("mapboxgl-control-container")[0].remove() }, [])


    return (
        <Container fluid className='mt-2'>
            <Row>
                <Col xs={7}>
                    <Map {...{ borders, city, removeWaypoint, filteredData, setFilteredData }} />
                </Col>
                <Col xs={5}>
                    <Summary />
                    <Accordion data={data} setData={setFilteredData} />
                </Col>
            </Row>
        </Container>
    )

}
