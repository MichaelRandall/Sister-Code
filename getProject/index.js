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

// will require an id passed in on the query
module.exports = async function (context, req) {
  const endpoint = config.endpoint;
  // const key = config.key;
  const secretKey = await secretClient.getSecret("cosmosProjectKey");
  const key = secretKey.value;
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(config.databaseId);
  const container = database.container(config.containerId);

  const theId = req.params.id;

  const { resource: theProject } = await container.item(theId).read();

  const myMessage = {
    status: "200",
    message: "Ok",
    id: theId,
    thing: theProject,
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: myMessage,
  };
};
