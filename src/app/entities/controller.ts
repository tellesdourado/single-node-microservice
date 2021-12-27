import { ActionParameters } from "./event-ingester";

export interface Controller {
  action<T>(params: ActionParameters): Promise<T | unknown>;
}
