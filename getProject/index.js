const config = require("../sharedCode/config");
const { CosmosClient } = require("@azure/cosmos");

// will require an id passed in on the query
module.exports = async function (context, req) {
    const endpoint = config.endpoint;
    const key = config.key;
    const client = new CosmosClient({ endpoint, key });


    const database = client.database(config.databaseId);
    const container = database.container(config.containerId);

    const theId = req.params.id;


    const {resource: theProject } = await container.item(theId).read();
    
    const myMessage = {
        "status":"200",
        "message": "Ok",
        "id":theId,
        "thing": theProject
    }


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: myMessage
    };
}