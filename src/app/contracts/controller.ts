import { ActionParameters } from "../../infra/adapters/contracts/event-ingester";

export interface Controller {
  action<T>(params: ActionParameters<unknown>): Promise<T | unknown>;
}
