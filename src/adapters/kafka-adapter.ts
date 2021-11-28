import {
  ConsumerConfig,
  EventType,
  ProducerConfig,
  EventIngester,
  ActionFunction,
} from "../entities/event-ingester";
import {
  Consumer,
  Kafka,
  logLevel,
  Producer,
  TopicPartitionOffsetAndMetadata,
} from "kafkajs";
import { environments } from "../utils/environments";

export class KafkaAdapter implements EventIngester {
  _kafka: Kafka;
  _producer: Producer;
  _consumer: Consumer;

  async init(type: EventType) {
    this._kafka = new Kafka({
      clientId: environments.kafka.clientId,
      brokers: environments.kafka.brokers,
      logLevel: logLevel.INFO,
    });

    if (type == "producer") {
      this._producer = this._kafka.producer();
      await this._producer.connect();
    }

    if (type == "consumer") {
      this._consumer = this._kafka.consumer({
        groupId: environments.kafka.groupId,
      });
      await this._consumer.connect();
    }
    return this;
  }

  async disconnect(type: EventType): Promise<this> {
    if (type == "consumer") await this._consumer.disconnect();

    if (type == "producer") await this._producer.disconnect();

    return this;
  }

  async consumer(data: ConsumerConfig, action: ActionFunction): Promise<void> {
    await this._consumer.subscribe({ topic: data.topic });
    await this._consumer.run({
      autoCommit: false,
      eachMessage: async ({ message, topic, partition }) => {
        action({
          message: message.value.toString(),
          metadata: { offset: message.offset, partition, topic },
        });
      },
    });
  }

  async delete({ offset, topic, partition }: TopicPartitionOffsetAndMetadata) {
    try {
      await this._consumer.commitOffsets([
        {
          offset: (parseInt(offset) + 1).toString(),
          topic,
          partition,
        },
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }
  async producer(data: ProducerConfig): Promise<boolean> {
    const post = async (message: string) => {
      await this._producer.send({
        topic: data.topic,
        messages: [{ value: message }],
      });
    };
    try {
      if (Array.isArray(data.message)) {
        await Promise.all(
          data.message.map(async (value) => {
            return await post(value);
          })
        );
      }

      if (typeof data.message === "string") {
        await post(data.message);
      }
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
