import { KafkaAdapter } from "../../infrastructure/adapters/kafka-adapter";
import { Route } from "../../entities/application";
import { ProducerService } from "../../../payment/services/producer";
import { PaymentController } from "../../../payment/payment-controller";

export async function api(): Promise<Route[]> {
  const routes: Route[] = [];

  const producerService = new ProducerService(
    await new KafkaAdapter().init("producer")
  );

  routes.push({
    controller: new PaymentController(producerService),
    path: "/api/payment",
    type: "post",
  });

  return routes;
}
