import { NextFunction, Request, Response } from "express";
import {
  ValidationError,
  UniqueConstraintError,
  DatabaseError,
  ForeignKeyConstraintError,
  ConnectionError,
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

  if (error instanceof ConnectionError) {
    return {
      message: "Connection Error",
      error: error,
    };
  } else if (error instanceof UserNotFoundExceptionError) {
    return {
      message: error.message,
      error: error,
    };
  } else if (error instanceof ValidationError) {
    console.log("Error on ValidationError", {
      path: error.errors[0].path,
      message: error.errors[0].message,
      value: error.errors[0].value,
    });
    const errors = error.errors
      .map((err: any) => `${err.path} ${err.message}`)
      .join(", ");
    return {
      message: ` ${errors}`,
      error: error,
    };
  } else if (error instanceof UniqueConstraintError) {
    console.log("Error on UniqueConstraintError", {
      path: error.errors[0].path,
      message: error.errors[0].message,
      value: error.errors[0].value,
    });
    return {
      message: ` ${error.message}`,
      error: error,
    };
  } else if (error instanceof ForeignKeyConstraintError) {
    console.log("Error on ForeignKeyConstraintError", error.index);
    return {
      message: `${error.message}`,
      error: error,
    };
  } else if (error instanceof DatabaseError) {
    console.log("Error on DatabaseError", error);
    return {
      message: error.message,
      error: error,
    };
  } else if (error instanceof TypeError) {
    console.log("Error on TypeError", error);
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
