import { JsonHeaderException } from "../errors/json-header-exception";
import { ActionParameters } from "../../contracts/event-ingester";
import { DtoValidator } from "../../../../kernel/contracts/dto-validator";

interface Header {
  [key: string]: string | Buffer;
}

export class ContentTypeValidator {
  private static readonly ct = "Content-Type";
  public static async json(
    value: string,
    h: Header,
    dto?: FunctionConstructor
  ) {
    if ((h[this.ct] as Buffer)?.toString() == "application/json") {
      let data = JSON.parse(value.toString());

      if (dto) {
        data = new dto();
        JSON.parse(value.toString(), (key, value) => {
          if (key) data[key] = value;
        });
        await (data as DtoValidator)?.validate();
      }

      return {
        data,
        header: { [this.ct]: "application/json" },
      } as ActionParameters<string>;
    } else {
      throw new JsonHeaderException(`the message should be a json object`);
    }
  }
}
