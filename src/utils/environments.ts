export const environments = {
  kafka: {
    clientId: process.env?.KAFKA_CLIENT_ID || "TestClient",
    brokers: [
      process.env?.KAFKA_BROKER_1 || "localhost:9092",
      process.env?.KAFKA_BROKER_2,
    ].filter(Boolean),
    groupId: process.env?.KAFKA_GROUP_ID || "TestGroup",
  },
  mongo: {
    username: process.env?.MONGO_USERNAME || "userRoot",
    password: process.env?.MONGO_PASSWORD || "userPassword",
    database: process.env?.MONGO_DATABASE_NAME || "TestDB",
    host: process.env?.MONGO_HOST || "localhost",
    port: process.env?.MONGO_PORT || 27017,
    tables: {
      consumerTable: process.env?.MONGO_CONSUMER_TABLE || "consumer-table",
    },
  },
};
