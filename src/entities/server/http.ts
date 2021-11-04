export interface HttpRequest {
  params?: { [key: string]: any };
  body?: any;
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}
