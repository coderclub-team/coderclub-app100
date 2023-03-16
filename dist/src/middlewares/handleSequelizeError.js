"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const custom_error_1 = require("../../custom.error");
function parseSequelizeError(error) {
    if (error.errors && error.errors.length === 0 && error.parent) {
        error.errors = [
            { path: error.parent.column, message: error.parent.message },
        ];
    }
    if (error instanceof sequelize_1.ConnectionError) {
        return {
            message: "Connection Error",
            error: error,
        };
    }
    else if (error instanceof custom_error_1.UserNotFoundExceptionError) {
        return {
            message: error.message,
            error: error,
        };
    }
    else if (error instanceof sequelize_1.ValidationError) {
        console.log("Error on ValidationError", {
            path: error.errors[0].path,
            message: error.errors[0].message,
            value: error.errors[0].value,
        });
        const errors = error.errors
            .map((err) => `${err.path} ${err.message}`)
            .join(", ");
        return {
            message: ` ${errors}`,
            error: error,
        };
    }
    else if (error instanceof sequelize_1.UniqueConstraintError) {
        console.log("Error on UniqueConstraintError", {
            path: error.errors[0].path,
            message: error.errors[0].message,
            value: error.errors[0].value,
        });
        return {
            message: ` ${error.message}`,
            error: error,
        };
    }
    else if (error instanceof sequelize_1.ForeignKeyConstraintError) {
        console.log("Error on ForeignKeyConstraintError", error.index);
        return {
            message: `${error.message}`,
            error: error,
        };
    }
    else if (error instanceof sequelize_1.DatabaseError) {
        console.log("Error on DatabaseError", error);
        return {
            message: error.message,
            error: error,
        };
    }
    else if (error instanceof TypeError) {
        console.log("Error on TypeError", error);
        return {
            message: error.message,
            error: error,
        };
    }
    else if (error instanceof custom_error_1.ProductCategoryNotFoundException) {
        return {
            message: error.message,
            error: error,
        };
    }
    else {
        console.log("Error on final", error);
        return {
            message: error.message,
            error: error,
        };
    }
}
function handleSequelizeError(err, req, res, next) {
    if (err) {
        res.status(400).json(parseSequelizeError(err));
    }
    else {
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.default = handleSequelizeError;
