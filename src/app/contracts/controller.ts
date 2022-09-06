import { ActionParameters } from "../../infra/adapters/contracts/event-ingestion";

export interface Controller {
  action<T>(params: ActionParameters<unknown>): Promise<T | unknown>;
}
