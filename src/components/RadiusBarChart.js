import {useEffect, useState} from "react"
import radius, {updateChart} from "../d3/radius"
import "../style/d3.css"

export default ({data, selectedRange}) => {
    const id = 'radius-prices'

    // Whenever the data changes -> re-render the chart
    useEffect(() => {
        if (data !== null) radius(data, selectedRange)
    }, [data])

    // Whenever the range in the slider changes -> update the opacity
    useEffect(() => {
        if (data !== null) updateChart(data, selectedRange)
    }, [selectedRange])

    return <div id={id}/>
}
