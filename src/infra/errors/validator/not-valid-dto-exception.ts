export class NotValidDtoException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
