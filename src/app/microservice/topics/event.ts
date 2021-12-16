import { PaymentController } from "../../../payment/payment-controller";
import {
  defaultProducer,
  defaultConsumer,
} from "../../../utils/ingester/default";
import { Controller } from "../../entities/controller";
// import { Controller } from "../../entities/controller";
import { Event } from "../../entities/event";
import { EventBase } from "../event-base";

// interface EventController {
//   controller: Controller;
//   event: Event;
// }

export async function events(): Promise<void> {
  // const events: Event[] = [];

  // paymentCtrl
  new EventBase({
    producer: await defaultProducer(),
    consumer: await defaultConsumer(),
  })
    .route({
      from: "process.payment",
      to: "processed.payment",
    })
    .controller(PaymentController as unknown as Controller);

  // events.push(payment);

  // return events;
}
