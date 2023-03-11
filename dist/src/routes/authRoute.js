"use strict";
// a /login route that will return a JWT token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const uniqueUserGaurd_1 = __importDefault(require("../middlewares/uniqueUserGaurd"));
const authRouter = (0, express_1.Router)();
authRouter.post("/login", authController_1.login);
authRouter.post("/register", uniqueUserGaurd_1.default, authController_1.register);
exports.default = authRouter;
