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
  producer(message: string): Promise<void>;
  consumer(action: ActionFunction): Promise<void>;
  controller(ctrl: Controller): void;
}
