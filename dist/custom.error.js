"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundExceptionError = exports.UniqueUserException = void 0;
class UniqueUserException extends Error {
    constructor(message) {
        super(message);
        this.name = "UniqueUserException";
        Object.setPrototypeOf(this, UniqueUserException.prototype);
    }
}
exports.UniqueUserException = UniqueUserException;
class UserNotFoundExceptionError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotFoundException";
        Object.setPrototypeOf(this, UserNotFoundExceptionError.prototype);
    }
}
exports.UserNotFoundExceptionError = UserNotFoundExceptionError;
