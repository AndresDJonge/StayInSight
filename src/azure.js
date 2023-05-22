// Get Cosmos Client
import {CosmosClient} from "@azure/cosmos";

const container = new CosmosClient("AccountEndpoint=https://listings-calender.documents.azure.com:443/;AccountKey=mCndrEtaCGgkbzVLfFh47Nk1tLKWvwsvgO9t92vHMpQhlWBdH8yOP4CZpiLga3rUdpQ5SINF19ZwACDbewWMtQ==;")
    .database("listings-calendar").container("listings-container")

export const findByListingId = async (id) => {
    const querySpec = {
        query: "select * from c where c.listing_id=@id",
        parameters: [
            {
                name: "@id",
                value: id
            }
        ]
    };

    // Get items
    const {resources} = await container.items.query(querySpec).fetchAll();
    return resources
}

// Retrieves the average price for a given set of ids
export const getAveragePriceByListingIds = async (ids) => {
    const idList = ids.join(",")
    const querySpec = {
        query: `select AVG(c.price)
                from c
                where c.listing_id in (${idList})`
    }

    const {resources} = await container.items.query(querySpec).fetchAll();
    return resources;
}

// Retrieves the average price for each listing provided in the ids list
export const getAveragePrices = async (ids, dateRange = null) => {
    var dateClause = "("

    if (dateRange !== null)
        dateRange.forEach(([low, high], i) => {
            if (i !== 0) dateClause += 'or '
            dateClause += `(c.date > "${low}" and c.date < "${high}") `
        });
    dateClause += ")"

    const idList = ids.join(",")
    const querySpec = {
        query: `select c.listing_id, AVG(c.price) as avg_price
                from c
                where c.listing_id in (${idList})
                    ${dateRange ? "and " + dateClause : ""}
                group by c.listing_id`
    }

    const {resources} = await container.items.query(querySpec).fetchAll();
    return resources;
}

export const getAveragePricePerDay = async (ids, dateRange = null) => {
    var dateClause = "("

    if (dateRange !== null)
        dateRange.forEach(([low, high], i) => {
            if (i !== 0) dateClause += 'or '
            dateClause += `(c.date > "${low}" and c.date < "${high}") `
        });
    dateClause += ")"

    const idList = ids.join(",")

    const querySpec = {
        query: `select c.date, AVG(c.price) as avg_price
                from c
                where c.listing_id in (${idList})
                    ${dateRange ? "and " + dateClause : ""}
                group by c.date`
    }

    const {resources} = await container.items.query(querySpec).fetchAll();
    return resources;
}

export const getAveragePricePerTypeDay = async () => {
    const querySpec = {
        query: `select udf.WEEKDAY(c.date), AVG(c.price)
                from c
                group by udf.WEEKDAY(c.date)`
    };

    const {resources} = await container.items.query(querySpec).fetchAll();
    return resources;
}
