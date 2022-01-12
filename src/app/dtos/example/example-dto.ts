import { RegisterValidation } from "../../../kernel/validation/register-validation";
import { SchemaValidation } from "../../../kernel/validation/schema-validation";
import { ExampleValidation } from "../../validations";

export class ExampleDto extends SchemaValidation {
  name: string;
  age: number;
}

RegisterValidation.add(ExampleDto.name, new ExampleValidation());
