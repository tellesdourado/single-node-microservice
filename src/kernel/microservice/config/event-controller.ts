import { Controller } from "../../../app/contracts/controller";
import { Route } from "../../contracts/routes";
import {
  ActionFunction,
  EventIngester,
} from "../../../infra/adapters/contracts/event-ingester";
import { MicroserviceSetup } from "./microservice-setup";
import { GenericClass } from "../../../app/contracts/generic-class";

export class EventController {
  private event: EventIngester = MicroserviceSetup.event;
  private _info: Route;

  constructor(private dto?: GenericClass) {}

  route(info: Route) {
    this._info = info;
    return this;
  }

  async post(message: string, headers: unknown): Promise<void> {
    if (!this._info.to) return;
    await this.event.producer({ topic: this._info.to, message, headers });
  }

  async dlq(message: string, headers: unknown) {
    await this.event.producer({
      topic: `${this._info.from}_dlq`,
      message,
      headers,
    });
  }

  async get(action: ActionFunction): Promise<void> {
    await this.event.controller(
      { topic: this._info.from },
      {
        action,
        response: this.post.bind(this),
        dlq: this.dlq.bind(this),
        dto: this.dto,
      }
    );
  }

  controller(ctrl: Controller) {
    this.get(ctrl.action);
    return this;
  }
}
