"use strict";
// a /login route that will return a JWT token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const uniqueUserGaurd_middleware_1 = __importDefault(require("../middlewares/uniqueUserGaurd.middleware"));
const authRouter = (0, express_1.Router)();
authRouter.post("/login", auth_controller_1.login);
authRouter.post("/register", uniqueUserGaurd_middleware_1.default, auth_controller_1.register);
exports.default = authRouter;
