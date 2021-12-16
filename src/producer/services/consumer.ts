import { Database } from "../../app/entities/database";
import {
  ActionFunction,
  ConsumerConfig,
  EventIngester,
} from "../../app/entities/event-ingester";
import { Service } from "../../app/entities/service";
import { environments } from "../../utils/environments";

export class ConsumerService implements Service {
  constructor(
    private eventIngester: EventIngester,
    private database: Database
  ) {}

  async run(data: ConsumerConfig) {
    const dbConnection = await this.database.createConnection();
    const consumerDatabase = dbConnection.setTable(
      environments.mongo.tables.consumerTable
    );

    const action: ActionFunction = async ({ message }) => {
      const id = await consumerDatabase.insertOne({ rawMessage: message });
      console.info(`message: [${message}] inserted by id: ${id}`);
    };

    this.eventIngester.consumer(data, action);
  }
}
