import {useEffect, useState} from "react"
import people, {updateChart} from "../d3/people"
import "../style/d3.css"

export default ({data, selectedRange}) => {
    const id = 'people-prices'

    // Whenever the data changes -> re-render the chart
    useEffect(() => {
        if (data !== null) people(data, selectedRange)
    }, [data])

    // Whenever the range in the slider changes -> update the opacity
    useEffect(() => {
        if (data !== null) updateChart(data, selectedRange)
    }, [...selectedRange])

    return <div id={id}/>
}
