import { KafkaAdapter } from "../infrastructure/adapters/kafka-adapter";
import { MicroserviceSetup } from "./config/microservice-setup";
import { events } from "./topics/event";

export class LoadApplication {
  async run() {
    MicroserviceSetup.setIngester(await new KafkaAdapter().init());
    await events();
  }
}
