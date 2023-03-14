import { NextFunction, Request, Response } from "express";

import { ValidationError, UniqueConstraintError } from "sequelize";
import { UserNotFoundExceptionError } from "../../custom.error";

function parseSequelizeError(error: Error | any): string | object {
  if (error instanceof UserNotFoundExceptionError) {
    return {
      message: error.message,
      error: error,
    };
  }
  if (error.errors.length === 0) {
    error.errors = [
      { path: error.parent.column, message: error.parent.message },
    ];
  }

  if (error instanceof ValidationError) {
    const errors = error.errors.map((err) => `${err.path} ${err.message}`);
    error.name;

    return {
      message: `Custom Validation error: ${errors.join(", ")}`,
      error: error,
    };
  } else if (error instanceof UniqueConstraintError) {
    const errors = error.errors.map((err) => `${err.path} ${err.message}`);
    return {
      message: `Custom Unique constraint error: ${errors.join(", ")}`,
      error: error,
    };
  }

  return {
    message: error.message,
    error: error,
  };
}

function handleSequelizeError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err) {
    res.status(400).json(parseSequelizeError(err));
  } else {
    next();
  }
}

export default handleSequelizeError;
