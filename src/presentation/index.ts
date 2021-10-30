import { KafkaAdapter } from "../adapters/kafka-adapter";
import { ProducerService } from "../services/producer";

const kafkaAdapter = new KafkaAdapter();
const producer = new ProducerService(kafkaAdapter);

producer.run("data".split("")).then(console.log);
