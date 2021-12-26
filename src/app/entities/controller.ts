import { ActionParameters } from "./event-ingester";

export interface Controller {
  action(params: ActionParameters): Promise<string>;
}
