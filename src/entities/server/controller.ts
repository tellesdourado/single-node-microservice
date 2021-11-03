import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
  action(request: HttpRequest): Promise<HttpResponse>;
}
