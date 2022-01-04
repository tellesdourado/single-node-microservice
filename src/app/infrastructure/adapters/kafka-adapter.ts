import {
  ConsumerConfig,
  EventType,
  ProducerConfig,
  EventIngester,
  ActionFunction,
  ConsumerCtrlParams,
} from "../../../app/entities/event-ingester";
import {
  Consumer,
  IHeaders,
  Kafka,
  logLevel,
  Producer,
  TopicPartitionOffsetAndMetadata,
} from "kafkajs";
import { environments } from "../../../utils/environments";
import { JsonHeaderException } from "../../errors/json-header-exception";
import { ContentTypeValidator } from "../utils/content-type-validator";

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

  async consumer(data: ConsumerConfig, action: ActionFunction): Promise<void> {
    await this._consumer.subscribe({ topic: data.topic });
    await this._consumer.run({
      autoCommit: false,
      eachMessage: async ({ message, topic, partition }) => {
        await action({
          message: message.value.toString(),
        });
        await this.delete({ offset: message.offset, partition, topic });
      },
    });
  }

  async consumerCtrl(
    data: ConsumerConfig,
    params: ConsumerCtrlParams
  ): Promise<void> {
    await this._consumer.subscribe({ topic: data.topic });
    await this._consumer.run({
      autoCommit: false,
      eachMessage: async ({ message, topic, partition }) => {
        try {
          const actionParams = ContentTypeValidator.json(
            message.value.toString(),
            message.headers
          );

          const responseData = await params.action(actionParams);

          if (responseData && params.response)
            await params.response(
              JSON.stringify(responseData),
              actionParams.headers
            );

          await this.delete({ offset: message.offset, partition, topic });
        } catch (error) {
          if (error instanceof JsonHeaderException) {
            await params.dlq(message.value.toString(), message.headers);
            await this.delete({
              offset: message.offset,
              partition,
              topic,
            });
          }
        }
      },
    });
  }

  async delete({ offset, topic, partition }: TopicPartitionOffsetAndMetadata) {
    await this._consumer.commitOffsets([
      {
        offset: (parseInt(offset) + 1).toString(),
        topic,
        partition,
      },
    ]);
  }

  async producer(data: ProducerConfig): Promise<void> {
    await this._producer.send({
      topic: data.topic,
      messages: [{ value: data.message, headers: data.headers as IHeaders }],
    });
  }
}
