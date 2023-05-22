import { useState, useEffect } from "react"
import Spinner from 'react-bootstrap/Spinner';

export default ({ data }) => {
    const [price, setPrice] = useState(0)
    const [season, setSeaon] = useState("Winter")

    useEffect(() => {
        //console.log("Summary based on data: ", data)
        const price = data.map(e => e.avg_price).reduce((a, cv) => a + cv, 0) / data.length

        setSeaon(data[0]["season"])
        setPrice(price ? price : 0)
    }, [data])

    return <div className="lead">{price ? <>You should ask €{Math.round(price, 2)} during {season}</> : <>Select your parameters</>}</div>
}
