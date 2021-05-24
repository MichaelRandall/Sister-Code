const config = require("../sharedCode/config");
const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  const endpoint = config.endpoint;
  const key = config.key;
  const client = new CosmosClient({ endpoint, key });


  const database = client.database(config.databaseId);
  const container = database.container(config.containerId);

  const querySpec = {
    query: "SELECT * from c"
  };

  let myprojects = [];

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  items.forEach(item => {
    myprojects.push(`${item.id} - ${item.project}`);
  });

  
  const message = {
    "first":"Hello All"
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    // body: myprojects,
    body: items
  }
};
