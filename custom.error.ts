export class UniqueUserException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UniqueUserException";

    Object.setPrototypeOf(this, UniqueUserException.prototype);
  }
}
