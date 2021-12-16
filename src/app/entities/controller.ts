import { ActionParameters } from "./event-ingester";
import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
  // it can be a event or http

  post?: (message: string) => Promise<void>;
  action(
    opt: ActionParameters | HttpRequest<unknown>
  ): Promise<void | HttpResponse>;
}
