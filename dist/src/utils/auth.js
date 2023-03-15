"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const data = user.get({
        plain: true,
    });
    const JWT_SECRET = process.env.JWT_SECRET || "Asdf@123$";
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
    return jsonwebtoken_1.default.sign(data, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
exports.generateToken = generateToken;
