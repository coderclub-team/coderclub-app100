"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const { UserGUID, EmailAddress, FirstName, LastName, Status, Account_Deactivated, CreatedDate, Address, Area, AuthID, City, DOB, FullName, Gender, Landmark, LoginName, Landline, } = user;
    return jsonwebtoken_1.default.sign("UserGUID", "Asfg" || "Asdf@1234", {
        expiresIn: "10h",
    });
};
exports.generateToken = generateToken;
