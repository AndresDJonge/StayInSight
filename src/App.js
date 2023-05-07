import cities from "./data/cities_coords";
import _data from "./data/cities/berlin_weekends.json";
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
    // a random set of 10 consecutive rooms for testing
    const [data, setData] = useState(_data.slice(0, 10))

    const [city, setCity] = useState(cities.find(x => x.key === 'berlin'))

    const removeWaypoint = (id) => {
        console.log("App, removing ", id)
        setData(data.filter(wp => wp.ID !== id))
    }

    useEffect(() => {
        console.log(process.env.COSMOS_CONNECTION_STRING)

        const results = findByListingId(16027728)
        console.log("results: ", results)
    }, [])
    useEffect(() => { document.getElementsByClassName("mapboxgl-control-container")[0].remove() }, [])


    return (
        <Container fluid className='mt-2'>
            <Row>
                <Col xs={7}>
                    <Map {...{ borders, city, removeWaypoint, data, setData }} />
                </Col>
                <Col xs={5}>
                    <Summary />
                    <Accordion data={data} setData={setData} />
                </Col>
            </Row>
        </Container>
    )

}
