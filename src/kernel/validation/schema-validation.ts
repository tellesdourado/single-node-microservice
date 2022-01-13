import { Validator } from "../../infra/adapters/contracts/validator";
import { DtoValidator } from "../contracts/dto-validator";
import { ProjectSetup } from "../microservice/config/project-setup";

export class SchemaValidation implements DtoValidator {
  constructor() {}
  public validate() {
    const validator: Validator = ProjectSetup.retrieve(Validator.name);
    return validator.validate(
      this.constructor.name,
      JSON.parse(JSON.stringify(this))
    );
  }
}
