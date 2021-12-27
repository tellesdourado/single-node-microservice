import {
  ConsumerConfig,
  EventType,
  ProducerConfig,
  EventIngester,
  ActionFunction,
  ActionParameters,
  ConsumerResponse,
} from "../../../app/entities/event-ingester";
import {
  Consumer,
  Kafka,
  logLevel,
  Producer,
  TopicPartitionOffsetAndMetadata,
} from "kafkajs";
import { environments } from "../../../utils/environments";

export class KafkaAdapter implements EventIngester {
  _kafka: Kafka;
  _producer: Producer;
  _consumer: Consumer;

  async init() {
    this._kafka = new Kafka({
      clientId: environments.kafka.clientId,
      brokers: environments.kafka.brokers,
      logLevel: logLevel.INFO,
    });

    this._producer = this._kafka.producer();
    await this._producer.connect();

    this._consumer = this._kafka.consumer({
      groupId: environments.kafka.groupId,
    });
    await this._consumer.connect();

    return this;
  }

  async disconnect(type: EventType): Promise<this> {
    if (type == "consumer") await this._consumer.disconnect();

    if (type == "producer") await this._producer.disconnect();

    return this;
  }

  async consumer(
    data: ConsumerConfig,
    action: ActionFunction,
    response: ConsumerResponse
  ): Promise<void> {
    await this._consumer.subscribe({ topic: data.topic });
    await this._consumer.run({
      autoCommit: false,
      eachMessage: async ({ message, topic, partition }) => {
        try {
          const actionParams: ActionParameters = {
            message: message.value.toString(),
            metadata: { offset: message.offset, partition, topic },
          };

          const res = await action(actionParams);
          if (res && response) await response(res as string);

          await this.delete(
            actionParams.metadata as TopicPartitionOffsetAndMetadata
          );
        } catch (error) {
          console.log(error);
          console.error(
            `kafka-adapter:consumer:action - processing message error`
          );
        }
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
      // todo: return void
      return true;
    } catch (e) {
      // todo: throw especific exception
      console.log(e);
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
