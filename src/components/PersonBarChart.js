import {useEffect, useState} from "react"
import people, {updateChart} from "../d3/people"
import "../style/d3.css"

export default ({ data, selectedRange }) => {
    const id = 'people-prices'

    useEffect(() => {
        people(data, selectedRange)
    }, [])

    useEffect(() => updateChart(data, selectedRange), [...selectedRange])

    return <div id={id}/>
}
