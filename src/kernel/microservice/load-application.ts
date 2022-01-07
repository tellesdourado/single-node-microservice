import { EnvManagerAdapter } from "../../infra/adapters/env-manager/env-manager-adapter";
import { KafkaControllerAdapter } from "../../infra/adapters/kafka/kafka-controller-adapter";
import { MicroserviceSetup } from "./config/microservice-setup";
import { routes } from "./topics/routes";

export class LoadApplication {
  async run() {
    MicroserviceSetup.setEnv(new EnvManagerAdapter());
    MicroserviceSetup.setIngester(await new KafkaControllerAdapter().init());
    await routes();
  }
}
