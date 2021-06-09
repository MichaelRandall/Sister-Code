const config = require("../sharedCode/config");
const { CosmosClient } = require("@azure/cosmos");

const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const keyVaultName = config.keyvaultname;
// const keyVaultName = "sistercodevault";

const keyVaultUri = `https://${keyVaultName}.vault.azure.net`;

// checks to see if local.settings.json has value first, indicates local
// second uses managed identity, indicating azure, since local.settings.js not uploaded
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUri, credential);

// will require data in the form of an object passed in on body
// will require an id passed in on query
module.exports = async function (context, req) {
  const endpoint = config.endpoint;
  // const key = config.key;
  const secretKey = await secretClient.getSecret("cosmosProjectKey");
  const key = secretKey.value;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(config.databaseId);
  const container = database.container(config.containerId);

  // req.params is part of the url path
  const theId = req.params.id;
  // req.query is part of the query string
  const theCategory = req.query.category;
  const newObject = req.body;

  const { resource: theProject } = await container
    .item(theId, theCategory)
    .read();

  const { id, category } = theProject;

  theProject.project = newObject.project;

  const { resource: updatedItem } = await container
    .item(id, category)
    .replace(theProject);

  const responseMessage = {
    status: 200,
    message: "it works, maybe",
    data: updatedItem,
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};
