"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const { UserGUID, EmailAddress, LoginName } = user;
    return jsonwebtoken_1.default.sign({ UserGUID, EmailAddress, LoginName }, process.env.JWT_SECRET || "Asdf@1234", {
        expiresIn: "1d",
    });
};
exports.generateToken = generateToken;
