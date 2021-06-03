const config = {
    endpoint: "https://mr-projects-app-db-acct.documents.azure.com:443/",
    key: "6qDPRNZs3B8EKB2lb4J3oClWwrQBwridinqRuR1srtf8wKwAAeVdRUvlnTrv2hdKn6RISuw3F1atTiy8vgKerA==",
    databaseId: "projectsDB",
    containerId: "projects",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };

// AccountEndpoint=https://mr-projects-app-db-acct.documents.azure.com:443/;AccountKey=6qDPRNZs3B8EKB2lb4J3oClWwrQBwridinqRuR1srtf8wKwAAeVdRUvlnTrv2hdKn6RISuw3F1atTiy8vgKerA==;
// cosmos uri: https://mr-projects-app-db-acct.documents.azure.com:443/
// prime key: 6qDPRNZs3B8EKB2lb4J3oClWwrQBwridinqRuR1srtf8wKwAAeVdRUvlnTrv2hdKn6RISuw3F1atTiy8vgKerA==
// conn str: AccountEndpoint=https://mr-projects-app-db-acct.documents.azure.com:443/;AccountKey=6qDPRNZs3B8EKB2lb4J3oClWwrQBwridinqRuR1srtf8wKwAAeVdRUvlnTrv2hdKn6RISuw3F1atTiy8vgKerA==;


// const config = {
//   endpoint: "https://mr-projects-app-db-acct.documents.azure.com:443/",
//   key: "https://sistercodevault.vault.azure.net/secrets/cosmosProjectCredential/afc88e70f7e948ebac9f9e2eb2b6c257",
//   databaseId: "projectsDB",
//   containerId: "projects",
//   partitionKey: { kind: "Hash", paths: ["/category"] }
// };
  
  module.exports = config;