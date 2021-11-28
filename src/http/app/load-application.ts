import { Application } from "../../entities/server/application";
import { api } from "../routes/api";

export class LoadApplication {
  constructor(private application: Application) {}
  async run() {
    const app = await this.application.init();

    const routes = await api();

    app.createRoute(routes);

    app.listen(3333);
  }
}
