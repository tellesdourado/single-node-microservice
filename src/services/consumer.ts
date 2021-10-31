import { Database } from "../entities/database";
import {
  ConsumerConfig,
  ProducerConsumer,
} from "../entities/producer-consumer";
import { Service } from "../entities/service";
import { environments } from "../utils/environments";
import { EventsSingleton } from "../utils/events-singleton";

export class ConsumerService implements Service {
  constructor(
    private producerConsumer: ProducerConsumer,
    private database: Database
  ) {}
  async run(data: ConsumerConfig) {
    this.producerConsumer.consumer(data);
    const dbConnection = await this.database.createConnection();
    const consumerDatabase = dbConnection.setTable(
      environments.mongo.tables.consumerTable
    );

    const events = EventsSingleton.getInstance();
    events.on("consumer-events", async (stream) => {
      const id = await consumerDatabase.insertOne({ rawMessage: stream });
      console.info(`message: [${stream}] inserted by id: ${id}`);
    });
  }
}
