"use strict";
// a /login route that will return a JWT token
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController.");
const userRouter = (0, express_1.Router)();
userRouter.get("/", userController_1.getAllUsers);
userRouter.get("/:MobileNo", userController_1.getUserById);
userRouter.delete("/:MobileNo", userController_1.deleteUserById);
userRouter.put("/:MobileNo", userController_1.updateUserById);
exports.default = userRouter;
