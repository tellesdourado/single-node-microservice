import { ProducerConsumer } from "../entities/producer-consumer";

export class ProducerService {
  constructor(private producerConsumer: ProducerConsumer) {}
  async run(data: any) {
    return await this.producerConsumer.producer(data);
  }
}
