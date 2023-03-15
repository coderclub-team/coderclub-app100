import { NextFunction, Request, Response } from "express";
import {
  ValidationError,
  UniqueConstraintError,
  DatabaseError,
  ForeignKeyConstraintError,
} from "sequelize";
import {
  ProductCategoryNotFoundException,
  UserNotFoundExceptionError,
} from "../../custom.error";

function parseSequelizeError(error: any): string | object {
  if (error.errors && error.errors.length === 0 && error.parent) {
    error.errors = [
      { path: error.parent.column, message: error.parent.message },
    ];
  }
  if (error instanceof UserNotFoundExceptionError) {
    return {
      message: error.message,
      error: error,
    };
  } else if (error instanceof ValidationError) {
    const errors = error.errors
      .map((err: any) => `${err.path} ${err.message}`)
      .join(", ");
    return {
      message: `Custom Validation error: ${errors}`,
      error: error,
    };
  } else if (error instanceof UniqueConstraintError) {
    const errors = error.errors
      .map((err: any) => `${err.path} ${err.message}`)
      .join(", ");
    return {
      message: `Custom Unique constraint error: ${errors}`,
      error: error,
    };
  } else if (error instanceof ForeignKeyConstraintError) {
    return {
      message: `Custom Foreign key constraint error: ${error.message}`,
      error: error,
    };
  } else if (error instanceof DatabaseError) {
    return {
      message: error.message,
      error: error,
    };
  } else if (error instanceof TypeError) {
    return {
      message: error.message,
      error: error,
    };
  } else if (error instanceof ProductCategoryNotFoundException) {
    return {
      message: error.message,
      error: error,
    };
  } else {
    console.log("Error on final", error);
    return {
      message: error.message,
      error: error,
    };
  }
}

function handleSequelizeError(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err) {
    res.status(400).json(parseSequelizeError(err));
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default handleSequelizeError;
