import Ajv, { Schema } from "ajv";
import { Validator } from "../contracts/validator";
import { RegisterValidation } from "../../../kernel/validation/register-validation";
import { ajvAdditionalInfo } from "./helpers/ajv-additional-info";
import { NotValidDtoException } from "../../errors/validator/not-valid-dto-exception";

export class AjvValidator implements Validator {
  async validate(className: string, object: object): Promise<void> {
    const validator = new Ajv();
    const schema: Schema = {
      ...RegisterValidation.find<object>(className),
      ...ajvAdditionalInfo,
    };
    console.log(schema);
    const tester = validator.compile(schema);
    tester(object);
    if (tester.errors) {
      throw new NotValidDtoException();
    }
  }
}
