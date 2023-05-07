// Get Cosmos Client
import { CosmosClient } from "@azure/cosmos";



export const findByListingId = async (id) => {
    const container = new CosmosClient(process.env.COSMOS_CONNECTION_STRING)

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