import { useEffect, useState } from "react"
import radius, { updateChart, exists } from "../d3/radius"
import "../style/d3.css"

export default ({ data, selectedRange }) => {
    const id = 'radius-prices'

    // Whenever the data changes -> re-render the chart
    useEffect(() => {
        if (data !== null) {
            //console.log("thomas data:", data)
            document.getElementById(id).innerHTML = "" // clear previous graph
            radius(data, selectedRange)
        }
    }, [data])

    // Whenever the range in the slider changes -> update the opacity
    useEffect(() => {
        if (data !== null) updateChart(data, selectedRange)
    }, [selectedRange])

    return <div id={id} />
}
