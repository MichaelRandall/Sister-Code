const config = {
    endpoint: "https://mr-projects-app-db-acct.documents.azure.com:443/",
    key: "6qDPRNZs3B8EKB2lb4J3oClWwrQBwridinqRuR1srtf8wKwAAeVdRUvlnTrv2hdKn6RISuw3F1atTiy8vgKerA==",
    databaseId: "projectsDB",
    containerId: "projects",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;