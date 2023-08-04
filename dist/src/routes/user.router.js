"use strict";
// a /login route that will return a JWT token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController.");
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", userController_1.getAllUsers);
userRouter.get("/:UserGUID", userController_1.getUserById);
userRouter.delete("/:UserGUID", userController_1.deleteUserById, handleSequelizeError_1.default);
exports.default = userRouter;
