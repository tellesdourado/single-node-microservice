import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
  action:
    | (<T>(message: unknown) => Promise<T>)
    | ((request: HttpRequest<unknown>) => Promise<HttpResponse>);
}
