export interface HttpRequest<T> {
  params?: { [key: string]: unknown };
  body?: T;
}

export interface HttpResponse {
  statusCode: number;
  body?: unknown;
}
