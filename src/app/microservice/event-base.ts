import { Controller } from "../entities/controller";
import { Event, Route } from "../entities/event";
import { ActionFunction, EventIngester } from "../entities/event-ingester";

export interface Ingesters {
  producer: EventIngester;
  consumer: EventIngester;
}

export class EventBase implements Event {
  constructor(private ingesters: Ingesters) {}

  private _info: Route;

  route(info: Route) {
    this._info = info;
    return this;
  }

  async producer(message: string): Promise<void> {
    await this.ingesters.producer.producer({ topic: this._info.to, message });
  }
  async consumer(action: ActionFunction): Promise<void> {
    await this.ingesters.consumer.consumer({ topic: this._info.from }, action);
  }

  controller(ctrl: any) {
    ctrl.post = this.producer;

    this.consumer(new ctrl().action as ActionFunction);
    return this;
  }
}
