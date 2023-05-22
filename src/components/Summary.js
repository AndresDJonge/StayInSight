import { useState, useEffect } from "react"
import Spinner from 'react-bootstrap/Spinner';

export default ({ filteredData }) => {
    const [price, setPrice] = useState(0)
    const [season, setSeaon] = useState("Winter")

    useEffect(() => {
        const price = filteredData.map(e => e.avg_price).reduce((a, cv) => a + cv, 0) / filteredData.length

        setSeaon(filteredData[0]["season"])
        setPrice(price ? price : 0)
    }, [])


    return <div className="lead">
        {price ?
            `You should ask $${Math.round(price).toFixed(2)} during ${season}` :
            'Select your parameters'
        }
    </div>
}
