import { Controller } from "../../contracts/controller";
import { ActionParameters } from "../../../infra/adapters/contracts/event-ingester";
import { ExampleDto } from "../../dtos/example/example-dto";

export class ExampleController implements Controller {
  async action({ data }: ActionParameters<ExampleDto>): Promise<string> {
    console.log(data);
    return data.name;
  }
}
