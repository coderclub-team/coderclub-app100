import { NextFunction, Request, Response } from "express";

import { ValidationError, UniqueConstraintError } from "sequelize";

function parseSequelizeError(error: Error): string | object {
  if (error instanceof ValidationError) {
    const errors = error.errors.map((err) => `${err.path} ${err.message}`);
    return {
      message: `Validation error: ${errors.join(", ")}`,
      error: error,
    };
  } else if (error instanceof UniqueConstraintError) {
    const errors = error.errors.map((err) => `${err.path} ${err.message}`);
    return {
      message: `Unique constraint error: ${errors.join(", ")}`,
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
    next(err);
  }
}

export default handleSequelizeError;
