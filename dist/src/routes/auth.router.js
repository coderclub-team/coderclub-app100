"use strict";
// a /login route that will return a JWT token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../../config");
const auth_controller_1 = require("../controllers/auth.controller");
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const authRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: config_1.userImageUploadOptions.storage,
    limits: config_1.userImageUploadOptions.limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});
authRouter.post("/login", auth_controller_1.login, handleSequelizeError_1.default);
authRouter.post("/register", upload.single("file"), auth_controller_1.register, handleSequelizeError_1.default);
authRouter.post("/verify-account", auth_controller_1.verifyAccount, handleSequelizeError_1.default);
authRouter.post("/send-otp", auth_controller_1.sendOTP, handleSequelizeError_1.default);
authRouter.post("/reset-password", auth_controller_1.resetPassword, handleSequelizeError_1.default);
authRouter.post("/forget-password", auth_controller_1.forgotPassword, handleSequelizeError_1.default);
authRouter.get("/current-user", auth_controller_1.getCurrentUser, handleSequelizeError_1.default);
exports.default = authRouter;
