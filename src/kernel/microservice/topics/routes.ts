import { ExampleController } from "../../../app/controllers/example/example-controller";
import { ExampleDto } from "../../../app/dtos/example/example-dto";
import { EventController } from "../config/event-controller";

export async function routes(): Promise<void> {
  new EventController(ExampleDto)
    .route({
      from: "process.example",
      to: "processed.example",
    })
    .controller(new ExampleController());
}
