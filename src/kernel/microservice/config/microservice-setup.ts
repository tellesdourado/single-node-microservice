import { EventIngester } from "../../../infra/adapters/contracts/event-ingester";

export class MicroserviceSetup {
  public static event: EventIngester;

  constructor() {
    throw new Error(`this class cant be initialized`);
  }

  static setIngester(ingester: EventIngester) {
    this.event = ingester;
  }
}
