import { Controller } from "../../contracts/controller";
import { ActionParameters } from "../../../infra/adapters/contracts/event-ingester";
import { ExampleDto } from "../../dtos/example/example-dto";
import { Database } from "../../../infra/adapters/contracts/database";

export class ExampleController implements Controller {
  constructor(private database: Database) {}

  async action({ data }: ActionParameters<ExampleDto>): Promise<object> {
    const id = await this.database
      .collection("example-collection")
      .insertOne(data);
    return { id };
  }
}
