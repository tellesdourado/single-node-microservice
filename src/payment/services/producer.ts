import {
  ProducerConfig,
  EventIngester,
} from "../../app/entities/event-ingester";
import { Service } from "../../app/entities/service";

export class ProducerService implements Service {
  constructor(private eventIngester: EventIngester) {}
  async run(data: ProducerConfig) {
    return await this.eventIngester.producer(data);
  }
}
