import { config } from "dotenv";
import { EnvManager } from "../contracts/env-manager";

export class EnvManagerAdapter implements EnvManager {
  async init(): Promise<void> {
    config();
  }
}
