import { EnvManager } from "../../../infra/adapters/contracts/env-manager";
import { EventIngester } from "../../../infra/adapters/contracts/event-ingester";

export class MicroserviceSetup {
  public static event: EventIngester;

  constructor() {
    throw new Error(`this class cant be initialized`);
  }

  static async setEnv(envManager: EnvManager) {
    await envManager.init();
  }

  static setIngester(ingester: EventIngester) {
    this.event = ingester;
  }
}
