import { Database } from "../../infra/adapters/contracts/database";
import { EnvManager } from "../../infra/adapters/contracts/env-manager";
import { EventIngestion } from "../../infra/adapters/contracts/event-ingestion";
import { Validator } from "../../infra/adapters/contracts/validator";
import { EnvManagerAdapter } from "../../infra/adapters/env-manager/env-manager-adapter";
import { KafkaControllerAdapter } from "../../infra/adapters/kafka/kafka-controller-adapter";
import { MongoAdapter } from "../../infra/adapters/mongo/mongo-adapter";
import { AjvValidator } from "../../infra/adapters/validator/ajv-adapter";
import { ProjectSetup } from "./config/project-setup";
import { routes } from "./topics/routes";

export class LoadApplication {
  static async run() {
    ProjectSetup.register(
      EnvManager.name,
      await new EnvManagerAdapter().init()
    );
    ProjectSetup.register(Database.name, await new MongoAdapter().init());
    ProjectSetup.register(
      EventIngestion.name,
      await new KafkaControllerAdapter().init()
    );
    ProjectSetup.register(Validator.name, new AjvValidator());

    await routes();
  }
}
