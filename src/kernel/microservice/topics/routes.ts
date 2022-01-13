import { ExampleController } from "../../../app/controllers/example/example-controller";
import { ExampleDto } from "../../../app/dtos/example/example-dto";
import { Database } from "../../../infra/adapters/contracts/database";
import { EventController } from "../config/event-controller";
import { ProjectSetup } from "../config/project-setup";

export async function routes(): Promise<void> {
  new EventController(ExampleDto)
    .route({
      from: "process.example",
      to: "processed.example",
    })
    .controller(new ExampleController(ProjectSetup.retrieve(Database.name)));
}
