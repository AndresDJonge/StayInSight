import { useEffect } from "react"
import demo from "../d3/example"
import { Button } from "react-bootstrap"
import "../style/d3.css"

export default ({ borders, city, removeWaypoint, data, setData }) => {

    useEffect(() => {
        demo(data, setData)
    }, [])

    return (
        <>
            <Button id="d3-button">Update!</Button>
            <svg id="samples" />
        </>
    )

}