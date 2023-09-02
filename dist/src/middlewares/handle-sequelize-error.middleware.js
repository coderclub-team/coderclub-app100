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
        if (error.errors[0].message === "UC_EmailAddress must be unique") {
            return {
                message: `Email address already exists`,
            };
        }
        else if (error.errors[0].message === "UC_MobileNo must be unique") {
            return {
                message: `Mobile number already exists`,
            };
        }
        else if (error.errors[0].message === "UC_LoginName must be unique") {
            return {
                message: `Login name already exists`,
            };
        }
        else if (error.errors[0].message === "User.EmailAddress cannot be null") {
            return {
                message: `Email address is required`,
            };
        }
        else if (error.errors[0].message === "User.MobileNo cannot be null") {
            return {
                message: `Mobile number is required`,
            };
        }
        else if (error.errors[0].message === "User.LoginName cannot be null") {
            return {
                message: `Login name is required`,
            };
        }
        else if (error.errors[0].message === "User.Password cannot be null") {
            return {
                message: `Password is required`,
            };
        }
        else if (error.errors[0].message === "User.FirstName cannot be null") {
            return {
                message: `First name is required`,
            };
        }
        const errors = error.errors
            .map((err) => `${err.path} ${err.message}`)
            .join(", ");
        return {
            message: ` ${errors}`,
            error: error,
        };
    }
    else if (error instanceof sequelize_1.UniqueConstraintError) {
        if (error.errors[0].message === "UC_EmailAddress must be unique") {
            return {
                message: `Email address already exists`,
                error: error,
            };
        }
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
        error.parent.message = error.parent.message.replace("SequelizeDatabaseError: ", "");
        console.log("Error on DatabaseError", error);
        return {
            message: error.parent.message,
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
