import { EnvManagerAdapter } from "../../infra/adapters/env-manager/env-manager-adapter";
import { KafkaAdapter } from "../../infra/adapters/kafka/kafka-adapter";
import { MicroserviceSetup } from "./config/microservice-setup";
import { routes } from "./topics/routes";

export class LoadApplication {
  async run() {
    MicroserviceSetup.setEnv(new EnvManagerAdapter());
    MicroserviceSetup.setIngester(await new KafkaAdapter().init());
    await routes();
  }
}
