import { Database } from "../entities/database";
import { ActionFunction, ConsumerConfig, EventIngester } from "../entities/event-ingester";
import { Service } from "../entities/service";
import { environments } from "../utils/environments";

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

    const action:ActionFunction = async({message,metadata}) =>{
      const id = await consumerDatabase.insertOne({ rawMessage: message });
      await this.eventIngester.delete(metadata);
      console.info(`message: [${message}] inserted by id: ${id}`);
    }

    this.eventIngester.consumer(data, action);
  }
}
