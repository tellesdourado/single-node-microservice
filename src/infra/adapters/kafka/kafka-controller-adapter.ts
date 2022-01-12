import { NotValidDtoException } from "../../errors/validator/not-valid-dto-exception";
import {
  ConsumerConfig,
  ConsumerCtrlParams,
} from "../contracts/event-ingester";
import { JsonHeaderException } from "./errors/json-header-exception";
import { ContentTypeValidator } from "./helpers/content-type-validator";
import { KafkaAdapter } from "./kafka-adapter";

export class KafkaControllerAdapter extends KafkaAdapter {
  async controller(
    data: ConsumerConfig,
    params: ConsumerCtrlParams
  ): Promise<void> {
    await this._consumer.subscribe({ topic: data.topic });
    await this._consumer.run({
      autoCommit: false,
      eachMessage: async ({ message, topic, partition }) => {
        try {
          const actionParams = await ContentTypeValidator.json(
            message.value.toString(),
            message.headers,
            params.dto
          );

          const responseData = await params.action(actionParams);

          if (responseData && params.response)
            await params.response(
              JSON.stringify(responseData),
              actionParams.headers
            );

          await this.delete({ offset: message.offset, partition, topic });
        } catch (error) {
          if (error instanceof JsonHeaderException || NotValidDtoException) {
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
}
