const config = require("./config");
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

// const keyVaultName = config.keyvaultname;

// const keyVaultUri = `https://${keyVaultName}.vault.azure.net`;

// const credential = new DefaultAzureCredential();

// const secretClient = new SecretClient(keyVaultUri, credential);
async function findKey() {
  const keyVaultName = config.keyvaultname;
  const keyVaultUri = `https://${keyVaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();
  const secretClient = new SecretClient(keyVaultUri, credential);
  const secretKey = await secretClient.getSecret("cosmosProjectKey");
  const key = secretKey.value;
  return key;
}

module.exports = {
  getKey: async () => {
    let key = await findKey();
    return key;
  },
};
