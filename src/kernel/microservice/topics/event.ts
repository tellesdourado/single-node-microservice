import { PaymentController } from "../../../app/controllers/payment/payment-controller";
import { EventController } from "../config/event-controller";

export async function events(): Promise<void> {
  new EventController()
    .route({
      from: "process.payment",
      to: "processed.payment",
    })
    .controller(new PaymentController());
}
