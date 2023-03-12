"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueUserException = void 0;
class UniqueUserException extends Error {
    constructor(message) {
        super(message);
        this.name = "UniqueUserException";
        Object.setPrototypeOf(this, UniqueUserException.prototype);
    }
}
exports.UniqueUserException = UniqueUserException;
