import { EventIngester } from "../../app/entities/event-ingester";
import { KafkaAdapter } from "../../app/infrastructure/adapters/kafka-adapter";

export const defaultProducer = async (): Promise<EventIngester> => {
  return await new KafkaAdapter().init("producer");
};

export const defaultConsumer = async (): Promise<EventIngester> => {
  return await new KafkaAdapter().init("consumer");
};
