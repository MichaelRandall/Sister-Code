const config = require("../sharedCode/config");
const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    const endpoint = config.endpoint;
    const key = config.key;
    const client = new CosmosClient({ endpoint, key });


    const database = client.database(config.databaseId);
    const container = database.container(config.containerId);

    // test value - uncomment to test
    // const testitem = {
    //     "project":"Do some situps, pig",
    //     "category": "task",
    //     "completed": false
    // }

    const {resource: createdItem } = await container.items.create(req.body.project);

    const responseMessage = {
        "status": 200,
        "message": "Ok",
        "data": createdItem
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}