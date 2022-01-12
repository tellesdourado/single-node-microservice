import { EnvManager } from "../../infra/adapters/contracts/env-manager";
import { EventIngester } from "../../infra/adapters/contracts/event-ingester";
import { Validator } from "../../infra/adapters/contracts/validator";
import { EnvManagerAdapter } from "../../infra/adapters/env-manager/env-manager-adapter";
import { KafkaControllerAdapter } from "../../infra/adapters/kafka/kafka-controller-adapter";
import { AjvValidator } from "../../infra/adapters/validator/ajv-adapter";
import { ProjectSetup } from "./config/project-setup";
import { routes } from "./topics/routes";

export class LoadApplication {
  async run() {
    ProjectSetup.register(
      EnvManager.name,
      await new EnvManagerAdapter().init()
    );
    ProjectSetup.register(
      EventIngester.name,
      await new KafkaControllerAdapter().init()
    );
    ProjectSetup.register(Validator.name, new AjvValidator());

    await routes();
  }
}
