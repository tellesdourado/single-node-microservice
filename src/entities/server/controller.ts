import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
  action(request: HttpRequest<unknown>): Promise<HttpResponse>;
}
