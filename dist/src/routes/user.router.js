"use strict";
// a /login route that will return a JWT token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../../config");
const userController_1 = require("../controllers/userController.");
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const userRouter = (0, express_1.Router)();
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
userRouter.get("/", userController_1.getAllUsers);
userRouter.get("/:UserGUID", userController_1.getUserById);
userRouter.put("/:UserGUID", upload.single("file"), userController_1.updateUserById, handleSequelizeError_1.default);
userRouter.delete("/:UserGUID", userController_1.deleteUserById, handleSequelizeError_1.default);
exports.default = userRouter;
