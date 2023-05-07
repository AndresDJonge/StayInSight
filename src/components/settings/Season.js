import {Slider} from '@mui/material';
import {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSnowflake, faSun} from '@fortawesome/free-regular-svg-icons';
import {faLeaf} from '@fortawesome/free-solid-svg-icons';
import {faCanadianMapleLeaf} from '@fortawesome/free-brands-svg-icons';

export default ({eventKey}) => {
    function parseValue(value) {
        return `${value}`;
    }

    return <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Season</Accordion.Header>
        <Accordion.Body>
            <Row style={{"width": "100%", marginLeft: "10px", paddingRight: "10px"}}>
                <Col className='p-0' xs={12}>
                    <Row>
                        <Col className='pr-0' xs={4}><FontAwesomeIcon size='2x' icon={faSnowflake}
                                                                      color='#57A5DD'/></Col>
                        <Col className='p-0' xs={4}><FontAwesomeIcon size='2x' icon={faLeaf} color='#9EC044'/></Col>
                        <Col className='p-0' xs={4}>
                            <Row>
                                <Col className='p-0' style={{marginLeft: "-10px"}}>
                                    <FontAwesomeIcon size='2x' icon={faSun} color='#F7DB4E'/>
                                </Col>

                                <Col className='pl-0 text-end' style={{marginRight: '10px'}}>
                                    <FontAwesomeIcon size='2x' icon={faCanadianMapleLeaf} color="#D85B32"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <Slider
                        style={{color: '#4E5154'}}
                        track={false}
                        aria-label="Seasons"
                        defaultValue={0}
                        getAriaValueText={parseValue}
                        valueLabelDisplay="off"
                        //step={10} //  (waarvan middelste 4 de values)
                        marks={labels}
                        min={0}
                        max={3}
                    />
                </Col>
            </Row>
        </Accordion.Body>
    </Accordion.Item>
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
