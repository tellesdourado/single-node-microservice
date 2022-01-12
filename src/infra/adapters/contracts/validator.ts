export abstract class Validator {
  validate: (name: string, object: object) => Promise<void>;
}
