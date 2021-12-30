import { ActionParameters } from "../../entities/event-ingester";
import { JsonHeaderException } from "../../errors/json-header-exception";

interface Header {
  [key: string]: string | Buffer;
}

export class ContentTypeValidator {
  private static readonly ct = "Content-Type";
  public static json(value: string, h: Header) {
    if ((h[this.ct] as Buffer)?.toString() == "application/json") {
      return {
        message: JSON.parse(value.toString()),
        header: { [this.ct]: "application/json" },
      } as ActionParameters;
    } else {
      throw new JsonHeaderException(`the message should be a json object`);
    }
  }
}
