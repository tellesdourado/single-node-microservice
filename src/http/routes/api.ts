import { KafkaAdapter } from "../../adapters/kafka-adapter";
import { Route } from "../../entities/server/application";
import { ProducerService } from "../../services/producer";
import { ProducerController } from "../controllers/producer-controller";

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
