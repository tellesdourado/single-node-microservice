import express, { Request, Response } from "express";
import { Application, Route } from "../entities/server/application";
import { HttpRequest, HttpResponse } from "../entities/server/http";

export class ExpressAdapter implements Application {
  private _app: express.Express;
  constructor() {
    this._app = express();
  }
  listen(port: number): void {
    this._app.listen(port, () => {
      console.info(`${ExpressAdapter.name} is running on port ${port}`);
    });
  }
  request(req: Request): HttpRequest {
    return { body: req.body, params: req.params } as HttpRequest;
  }

  reponse(actionResponse: HttpResponse, expressResponse: Response) {
    return expressResponse
      .status(actionResponse.statusCode)
      .send(actionResponse.body);
  }

  async init(): Promise<this> {
    this._app.use(express.json());
    return this;
  }
  createRoute(route: Route): void {
    this._app[route.type](route.path, async (req, res) => {
      const actionResponse = await route.controller.action(this.request(req));
      return this.reponse(actionResponse, res);
    });
  }
}
