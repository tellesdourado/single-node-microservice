import { ProjectSetup } from "../microservice/config/project-setup";

export class RegisterValidation extends ProjectSetup {
  static add(to: string, cls: unknown) {
    this.register(to, cls);
  }
}
