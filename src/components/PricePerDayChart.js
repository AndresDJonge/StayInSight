import {useEffect} from "react"
import dayprice from "../d3/dayprice"
import "../style/d3.css"
import {updateChart} from "../d3/dayprice";

export default ({ data, selectedRange }) => {
    const id = 'day-prices'

    useEffect(() => {
        if (data !== null) dayprice(data, selectedRange)
    }, [data])

    useEffect(() => {
        if (data !== null) updateChart(data, selectedRange)
    }, [...selectedRange])

    return <div id={id}/>
}
