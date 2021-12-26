import { EventIngester } from "../entities/event-ingester";

export class MicroserviceSetup {
  public static event: EventIngester;

  constructor() {
    throw new Error(`this class cant be initialized`);
  }

  static setIngester(ingester: EventIngester) {
    this.event = ingester;
  }
}
