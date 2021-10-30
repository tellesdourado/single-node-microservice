export const environments = {
  kafka: {
    clientId: process.env?.KAFKA_CLIENT_ID || "TestClient",
    brokers: [
      process.env?.KAFKA_BROKER_1 || "localhost:9092",
      process.env?.KAFKA_BROKER_2,
    ].filter(Boolean),
    groupId: process.env?.KAFKA_GROUP_ID || "TestGroup",
  },
};
