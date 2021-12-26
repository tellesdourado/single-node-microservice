import { Controller } from "../entities/controller";
import { Event, Route } from "../entities/event";
import { ActionFunction, EventIngester } from "../entities/event-ingester";
import { MicroserviceSetup } from "./microservice-setup";

export class EventBase implements Event {
  private event: EventIngester = MicroserviceSetup.event;

  private _info: Route;

  route(info: Route) {
    this._info = info;
    return this;
  }

  async post(message: string): Promise<void> {
    await this.event.producer({ topic: this._info.to, message });
  }
  async get(action: ActionFunction): Promise<void> {
    this.post.bind(this);
    await this.event.consumer(
      { topic: this._info.from },
      action,
      this.post.bind(this)
    );
  }

  controller(ctrl: Controller) {
    this.get(ctrl.action);
    return this;
  }
}