import { KafkaAdapter } from "../../infrastructure/adapters/kafka-adapter";
import { Route } from "../../entities/application";
import { ProducerService } from "../../../producer/services/producer";
import { ProducerController } from "../../../producer/producer-controller";

export async function api(): Promise<Route[]> {
  const routes: Route[] = [];

  const producerService = new ProducerService(
    await new KafkaAdapter().init("producer")
  );

  routes.push({
    controller: new ProducerController(producerService),
    path: "/api/producer",
    type: "post",
  });

  return routes;
}
