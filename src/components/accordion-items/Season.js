import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import {Card, Col, Placeholder, Row} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faSun } from '@fortawesome/free-regular-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';
import { CustomToggle } from "../CustomToggle";
import _drawChart from "../../d3/season";
import { getAveragePrices, getAveragePricePerDay } from "../../azure";

export default ({ eventKey, filters, setFilters, staticData, setStaticData, filteredData, setFilteredData }) => {
    const drawChart = async _ => {
        const pricePerDay = await getAveragePricePerDay(staticData.map(c => c["id"]))
        _drawChart(pricePerDay)
    }

    const updateAvgPrices = async newVal => {
        let range = [];

        if (newVal === 0) range = [["2023-01-01", "2023-03-19"], ["2023-12-22", "2023-12-31"]]
        if (newVal === 1) range = [["2023-03-20", "2023-06-20"]]
        if (newVal === 2) range = [["2023-06-21", "2023-09-21"]]
        if (newVal === 3) range = [["2023-09-21", "2023-31-21"]]


        const results = await getAveragePrices(
            staticData.map(v => v.id),
            range
        )

        const copy = Object.entries(staticData).map(([k, v]) => {
            const match = results.find(e => e["listing_id"] === v["id"]);

            const listing_copy = {...v};
            listing_copy["avg_price"] = match["avg_price"]
            listing_copy["season"] = labels.find(e => e.value === newVal)["label"]

            return (k, listing_copy)
        })


        setStaticData([...copy])
    }

    useEffect(() => { drawChart(); updateAvgPrices(0) }, [])

    return (
        <Card>
            <Card.Header>
                <div className='lead text-center'>Season</div>
                <Row style={{ "width": "100%", marginLeft: "10px", paddingRight: "10px" }}>
                    <Col className='p-0' xs={12}>
                        <Row>
                            <Col className='pr-0' xs={4}>
                                <FontAwesomeIcon size='2x' icon={faSnowflake} className="color-primary-0"/>
                            </Col>
                            <Col className='p-0' xs={4}>
                                <FontAwesomeIcon size='2x' icon={faLeaf} className="color-secondary-1-0" />
                            </Col>
                            <Col className='p-0' xs={4}>
                                <Row>
                                    <Col className='p-0' style={{ marginLeft: "-10px" }}>
                                        <FontAwesomeIcon size='2x' icon={faSun} className="color-secondary-2-0" />
                                    </Col>
                                    <Col className='pl-0 text-end' style={{ marginRight: '10px' }}>
                                        <FontAwesomeIcon size='2x' icon={faCanadianMapleLeaf} className="color-complement-0" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <Slider
                            onChange={(_, newVal) => updateAvgPrices(newVal)}
                            style={{ color: '#4E5154' }}
                            track={false}
                            aria-label="Seasons"
                            defaultValue={0}
                            getAriaValueText={v => `${v}`}
                            valueLabelDisplay="off"
                            marks={labels}
                            min={0}
                            max={3}
                        />
                    </Col>
                </Row>
                <CustomToggle eventKey={eventKey} />
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    <div id="season" />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

const labels = [
    {
        value: 0,
        label: "Winter"
    },
    {
        value: 1,
        label: "Spring"
    },
    {
        value: 2,
        label: "Summer",
    },
    {
        value: 3,
        label: "Autumn",
    }
]
