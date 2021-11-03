import { ProducerConfig, EventIngester } from "../entities/event-ingester";
import { Service } from "../entities/service";

export class ProducerService implements Service {
  constructor(private eventIngester: EventIngester) {}
  async run(data: ProducerConfig) {
    return await this.eventIngester.producer(data);
  }
}
