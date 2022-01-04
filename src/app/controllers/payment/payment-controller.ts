import { Controller } from "../../contracts/controller";
import { ActionParameters } from "../../../infra/adapters/contracts/event-ingester";

export class PaymentController implements Controller {
  async action({ message }: ActionParameters): Promise<string> {
    return message;
  }
}
