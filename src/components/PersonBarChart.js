import { useEffect } from "react"
import price from "../d3/people"
import { Button } from "react-bootstrap"
import "../style/d3.css"

export default ({ borders, city, removeWaypoint, data, setData }) => {

    useEffect(() => {
        price(data, setData)
    }, [])

    return (
        <>
            <svg id="people-prices" />
        </>
    )

}
