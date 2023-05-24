import { useState, useEffect } from "react"

export default ({ staticData, filteredData }) => {
    const [price, setPrice] = useState(0)
    const [season, setSeason] = useState("Winter")

    useEffect(() => {
        const price = filteredData.map(e => e.avg_price).reduce((a, cv) => a + cv, 0) / filteredData.length;
        const season = filteredData[0] ? filteredData[0]["season"] : "the year";

        setSeason(season);
        setPrice(price ? price : 0);
    }, [staticData, filteredData])


    return <div className="lead">
        {price ?
            `You should ask $${Math.round(price).toFixed(2)} during ${season}` :
            'Select your parameters'
        }
    </div>

/*
    return <Placeholder as="p" animation="wave">
        <Placeholder xs={12}/>
    </Placeholder>
         */
}
