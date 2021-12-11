import { Controller } from "./controller";
import { HttpRequest, HttpResponse } from "./http";

export type RequestType = "get" | "post" | "put" | "patch";

export interface Route {
  path: string;
  type: RequestType;
  controller: Controller;
}

export interface Application {
  init(): Promise<this>;
  createRoute(route: Route[]): void;
  request(req: unknown): HttpRequest<unknown>;
  reponse(res: HttpResponse, adapterResponse: unknown): unknown;
  listen(port: number): void;
}
