import { Controller } from "../app/entities/controller";
import { ActionParameters } from "../app/entities/event-ingester";

export class PaymentController implements Controller {
  async action({ message }: ActionParameters): Promise<string> {
    return message;
  }
}
