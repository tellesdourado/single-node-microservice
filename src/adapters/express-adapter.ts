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
  request(req: Request): HttpRequest<unknown> {
    return { body: req.body, params: req.params } as HttpRequest<unknown>;
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
  createRoute(routes: Route[]): void {
    // receive all route based in our pattern and convert to express version
    routes.map((route) =>
      this._app[route.type](route.path, async (req, res) => {
        const actionResponse = await route.controller.action(this.request(req));
        return this.reponse(actionResponse, res);
      })
    );

    // set config to return 404 when a not valid route is called
    this._app.use((_, res, next) => {
      res.status(404).send();
      next();
    });
  }
}
