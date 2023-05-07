// Get Cosmos Client
import { CosmosClient } from "@azure/cosmos";

export const findByListingId = async (id) => {
    const container = new CosmosClient("AccountEndpoint=https://listings-calender.documents.azure.com:443/;AccountKey=mCndrEtaCGgkbzVLfFh47Nk1tLKWvwsvgO9t92vHMpQhlWBdH8yOP4CZpiLga3rUdpQ5SINF19ZwACDbewWMtQ==;")
        .database("listings-calendar").container("listings-container")

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
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources
}