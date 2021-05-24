const config = require("../sharedCode/config");
const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    const endpoint = config.endpoint;
    const key = config.key;
    const client = new CosmosClient({ endpoint, key });

    const database = client.database(config.databaseId);
    const container = database.container(config.containerId);

    const theId = req.query.id;
    const theCategory = req.query.category;

    const { resource: result } = await container.item(theId, theCategory).delete();
    
    const responseMessage = "It is complete";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}