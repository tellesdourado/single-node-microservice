import {
  ConsumerConfig,
  ProducerConsumer,
} from "../entities/producer-consumer";
import { Service } from "../entities/service";
import { EventsSingleton } from "../utils/events-singleton";

export class ConsumerService implements Service {
  constructor(private producerConsumer: ProducerConsumer) {}
  async run(data: ConsumerConfig) {
    this.producerConsumer.consumer(data);
    const events = EventsSingleton.getInstance();
    events.on("consumer-events", (stream) => {
      console.log(stream);
    });
  }
}
