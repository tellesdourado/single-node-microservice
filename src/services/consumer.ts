import { Database } from "../entities/database";
import { ConsumerConfig, EventIngester } from "../entities/event-ingester";
import { Service } from "../entities/service";
import { environments } from "../utils/environments";
import { EventsSingleton } from "../utils/events-singleton";

export class ConsumerService implements Service {
  constructor(
    private eventIngester: EventIngester,
    private database: Database
  ) {}
  async run(data: ConsumerConfig) {
    this.eventIngester.consumer(data);
    const dbConnection = await this.database.createConnection();
    const consumerDatabase = dbConnection.setTable(
      environments.mongo.tables.consumerTable
    );

    const events = EventsSingleton.getInstance();
    events.on("consumer-events", async ({ message, metadata }) => {
      const id = await consumerDatabase.insertOne({ rawMessage: message });
      await this.eventIngester.delete(metadata);
      console.info(`message: [${message}] inserted by id: ${id}`);
    });
  }
}
