import {
  ProducerConfig,
  ProducerConsumer,
} from "../entities/producer-consumer";
import { Service } from "../entities/service";

export class ProducerService implements Service {
  constructor(private producerConsumer: ProducerConsumer) {}
  async run(data: ProducerConfig) {
    return await this.producerConsumer.producer(data);
  }
}
