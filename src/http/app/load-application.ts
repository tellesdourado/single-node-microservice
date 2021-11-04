import { Application } from "../../entities/server/application";
import { api } from "../routes/api";

export class LoadApplication {
  constructor(private application: Application) {}
  async run() {
    const app = await this.application.init();

    await Promise.all(
      (
        await api()
      ).map((route) => {
        app.createRoute(route);
      })
    );

    app.listen(3333);
  }
}
