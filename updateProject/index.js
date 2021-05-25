const config = require("../sharedCode/config");
const { CosmosClient } = require("@azure/cosmos");

// will require data in the form of an object passed in on body
// will require an id passed in on query
module.exports = async function (context, req) {
  const endpoint = config.endpoint;
  const key = config.key;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(config.databaseId);
  const container = database.container(config.containerId);

  const theId = req.params.id;
  const { resource: theProject } = await container.item(theId).read();

  const { id, category } = theProject;

  theProject.project = "Grapple with a bear";

  const { resource: updatedItem } = await container
    .item(id, category)
    .replace(theProject);

  const responseMessage = {
    status: 200,
    message: res.message,
    data: updatedItem,
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};
