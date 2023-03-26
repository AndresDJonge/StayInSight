import cities from "./data/cities_coords";
import _data from "./data/cities/berlin_weekends.json";
import borders from "./data/borders/amsterdam";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Map from "./components/Map";
import Chart from "./components/DemoBarChart";
import "./style/App.css"

export default () => {
    // a random set of 10 consecutive rooms for testing
    const [data, setData] = useState(_data.slice(0, 10))

    const [city, setCity] = useState(cities.find(x => x.key === 'berlin'))

    const removeWaypoint = (id) => {
        console.log("App, removing ", id)
        setData(data.filter(wp => wp.ID !== id))
    }

    useEffect(() => { console.log("render App!") }, [])


    return (
        <Container fluid>
            <Row>
                <Col xs={6}>
                    <Map {...{ borders, city, removeWaypoint, data, setData }} />
                </Col>
                <Col xs={6}>
                    <Chart {...{ borders, city, removeWaypoint, data, setData }} />
                </Col>
            </Row>
        </Container>
    )

}