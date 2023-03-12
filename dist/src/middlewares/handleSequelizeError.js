"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function parseSequelizeError(error) {
    if (error instanceof sequelize_1.ValidationError) {
        const errors = error.errors.map((err) => `${err.path} ${err.message}`);
        return {
            message: `Validation error: ${errors.join(", ")}`,
            error: error,
        };
    }
    else if (error instanceof sequelize_1.UniqueConstraintError) {
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
function handleSequelizeError(err, req, res, next) {
    if (err) {
        res.status(400).json(parseSequelizeError(err));
    }
    else {
        next(err);
    }
}
exports.default = handleSequelizeError;
