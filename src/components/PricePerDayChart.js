import {useEffect, useState} from "react"
import dayprice from "../d3/dayprice"
import "../style/d3.css"

export default ({ data }) => {
    const id = 'day-prices'

    useEffect(() => {
        dayprice(data)
    }, [])

    return <div id={id}/>
}
