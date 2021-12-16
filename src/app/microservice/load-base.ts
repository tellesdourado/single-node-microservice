import { events } from "./topics/event";

export class LoadBase {
  async run() {
    await events();
  }
}
