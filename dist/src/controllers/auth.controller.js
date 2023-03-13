"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.login = exports.register = void 0;
const node_path_1 = __importDefault(require("node:path"));
const User_model_1 = __importDefault(require("../models/User.model"));
const auth_1 = require("../utils/auth");
const node_fs_1 = __importDefault(require("node:fs"));
const config_1 = require("../../config");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        // move the file to the uploads directory
        const { filename, path: tmpPath } = req.file;
        req.body.tmpPath = tmpPath;
        req.body.uploadPath = node_path_1.default.join(config_1.userImageUploadOptions.relativePath, filename);
        req.body.PhotoPath = node_path_1.default.join(config_1.userImageUploadOptions.directory, filename);
    }
    try {
        const createdUser = yield User_model_1.default.create(req.body);
        if (req.file) {
            node_fs_1.default.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            createdUser.PhotoPath = node_path_1.default.join(req.protocol + "://" + req.get("host"), createdUser.PhotoPath);
        }
        const token = (0, auth_1.generateToken)(createdUser);
        return res.status(201).json({
            message: "User created successfully!",
            token,
            user: createdUser,
        });
    }
    catch (error) {
        // remove the uploaded file
        // if (req.body.tmpPath) {
        //   fs.unlink(req.body.tmpPath, (err) => {
        //     if (err) {
        //       console.log(err);
        //     }
        //   });
        // }
        next(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo, Password } = req.body;
    if (!MobileNo || !Password) {
        return res.status(400).json({
            message: "MobileNo and password are required!",
        });
    }
    try {
        const user = yield User_model_1.default.findOne({
            where: {
                MobileNo,
            },
            attributes: {
                exclude: [
                    "OTP",
                    "AuthID",
                    "Logouttime",
                    "ModifiedDate",
                    "DeletedDate",
                    "CreatedDate",
                    "ModifiedGUID",
                    "CreatedGUID",
                    "DeletedGUID",
                ],
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        const isValidPassword = yield user.comparePassword(Password);
        user.set("Password", null);
        user.PhotoPath = node_path_1.default.join(req.protocol + "://" + req.get("host"), user.PhotoPath);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid password!",
            });
        }
        const token = (0, auth_1.generateToken)(user);
        return res.status(200).json({
            message: "Login successful!",
            token,
            user,
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.login = login;
// signout a user and invalidate the token
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "Signout should be implemented at the Frontend side!",
    });
});
exports.signout = signout;
