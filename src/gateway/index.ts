import { KafkaAdapter } from "../adapters/kafka-adapter";
import { MongoAdapter } from "../adapters/mongo-adatper";
import { ConsumerService } from "../services/consumer";
import { ProducerService } from "../services/producer";

const kafkaAdapter = new KafkaAdapter();
const mongoAdapter = new MongoAdapter();

export = async () => {
  const producer = new ProducerService(await kafkaAdapter.init("producer"));
  const consumer = new ConsumerService(
    await kafkaAdapter.init("consumer"),
    mongoAdapter
  );

  return { producer, consumer };
};
