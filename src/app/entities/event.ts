import { Controller } from "./controller";
import { ActionFunction } from "./event-ingester";

export interface EventRequest {
  message: string;
}

export interface Route {
  to: string;
  from: string;
}

export interface Event {
  route(info: Route): this;
  post(message: string): Promise<void>;
  get(action: ActionFunction): Promise<void>;
  controller(ctrl: Controller): void;
}
