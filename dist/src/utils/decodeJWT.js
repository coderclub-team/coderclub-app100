"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (req) => {
    // Get the token from the Authorization header
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        throw new Error("No token, authorization denied");
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error("Token is not valid");
    }
};
//
