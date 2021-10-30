import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
  execute(data: HttpRequest): Promise<HttpResponse>;
}
