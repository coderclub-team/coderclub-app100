"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function parseSequelizeError(error) {
    console.log("  error.parent.message", error.parent.message);
    if (error.errors.length === 0) {
        error.errors = [
            { path: error.parent.column, message: error.parent.message },
        ];
    }
    if (error instanceof sequelize_1.ValidationError) {
        const errors = error.errors.map((err) => `${err.path} ${err.message}`);
        error.name;
        return {
            message: `Custom Validation error: ${errors.join(", ")}`,
            error: error,
        };
    }
    else if (error instanceof sequelize_1.UniqueConstraintError) {
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
function handleSequelizeError(err, req, res, next) {
    if (err) {
        res.status(400).json(parseSequelizeError(err));
    }
    else {
        next();
    }
}
exports.default = handleSequelizeError;
