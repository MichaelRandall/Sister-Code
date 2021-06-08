const config = require("../sharedCode/config");
const retrieveKey = require("../sharedCode/retrieveKey");
const { CosmosClient } = require("@azure/cosmos");

// let aKey = retrieveKey.getKey().then((result) => {
//   return result;
// });

const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const keyVaultName = config.keyvaultname;
// const keyVaultName = "sistercodevault";

const keyVaultUri = `https://${keyVaultName}.vault.azure.net`;

// checks to see if local.settings.json has value first, indicates local
// second uses managed identity, indicating azure, since local.settings.js not uploaded

const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUri, credential);

module.exports = async function (context, req) {
  const endpoint = config.endpoint;

  const secretKey = await secretClient.getSecret("cosmosProjectKey");
  const key = secretKey.value;

  // test for refactor code
  // const key = retrieveKey.getKey().then((result) => {
  //   return result.data;
  // });

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(config.databaseId);
  const container = database.container(config.containerId);

  const querySpec = {
    query: "SELECT * from c",
  };

  let myprojects = [];

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  items.forEach((item) => {
    myprojects.push(`${item.id} - ${item.project}`);
  });

  const message = {
    first: "Hello All",
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    // body: myprojects,
    body: items,
  };
};
