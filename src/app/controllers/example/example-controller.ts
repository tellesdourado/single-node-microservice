import { Controller } from "../../contracts/controller";
import { ActionParameters } from "../../../infra/adapters/contracts/event-ingester";

export class ExampleController implements Controller {
  async action({ message }: ActionParameters<string>): Promise<string> {
    return message;
  }
}
