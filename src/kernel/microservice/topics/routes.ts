import { ExampleController } from "../../../app/controllers/example/example-controller";
import { EventController } from "../config/event-controller";

export async function routes(): Promise<void> {
  new EventController()
    .route({
      from: "process.example",
      to: "processed.example",
    })
    .controller(new ExampleController());
}
