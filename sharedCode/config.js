const config = {
  endpoint: "https://mr-projects-app-db-acct.documents.azure.com:443/",
  keyvaultname: "sistercodevault",
  databaseId: "projectsDB",
  containerId: "projects",
  partitionKey: { kind: "Hash", paths: ["/category"] },
};

module.exports = config;
