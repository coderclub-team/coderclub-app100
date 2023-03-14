export class UniqueUserException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UniqueUserException";

    Object.setPrototypeOf(this, UniqueUserException.prototype);
  }
}

export class UserNotFoundExceptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundException";
    Object.setPrototypeOf(this, UserNotFoundExceptionError.prototype);
  }
}
