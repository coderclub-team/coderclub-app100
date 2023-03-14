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
exports.signout = exports.resetPassword = exports.resendOTP = exports.verifyAccount = exports.login = exports.register = void 0;
const node_path_1 = __importDefault(require("node:path"));
const User_model_1 = __importDefault(require("../models/User.model"));
const auth_1 = require("../utils/auth");
const node_fs_1 = __importDefault(require("node:fs"));
const config_1 = require("../../config");
const generateOTP_1 = __importDefault(require("../utils/generateOTP"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { OTP, OtpExpiryDate } = (0, generateOTP_1.default)();
    req.body.OTP = OTP;
    req.body.OtpExpiryDate = OtpExpiryDate;
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
        if (req.body.tmpPath) {
            node_fs_1.default.unlink(req.body.tmpPath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
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
        // Status ==1 means user is active
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
        else if (user.Status == 0) {
            return res.status(400).json({
                message: "User is not verified!",
            });
        }
        const isValidPassword = yield user.comparePassword(Password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid password!",
            });
        }
        user.set("Password", null);
        if (user.PhotoPath)
            user.PhotoPath = node_path_1.default.join(req.protocol.toString() + "://" + req.get("host"), user.PhotoPath);
        const token = (0, auth_1.generateToken)(user);
        return res.status(200).json({
            message: "Login successful!",
            token,
            user,
        });
    }
    catch (error) {
        console.log("error===", error);
        return res.status(500).json(error);
    }
    // } catch (error: any) {
    //   return res.status(500).json(error);
    // }
});
exports.login = login;
const verifyAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo, OTP } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    const currentDate = new Date();
    try {
        const user = yield User_model_1.default.findOne({
            where: {
                MobileNo,
            },
            paranoid,
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        else if (!user.OTP) {
            return res.status(400).json({
                message: "OTP is not generated!",
            });
        }
        else if (user.OTP !== OTP) {
            return res.status(400).json({
                message: "Invalid OTP!",
            });
        }
        else if (!user.OtpExpiryDate) {
            return res.status(400).json({
                message: "OTP is not generated!",
            });
        }
        else if (user.OtpExpiryDate < currentDate) {
            return res.status(400).json({
                message: "OTP is expired!",
            });
        }
        else if (user.Status === 1) {
            return res.status(400).json({
                message: "User is already verified!",
            });
        }
        user.set("OTP", null);
        user.set("Status", 1);
        yield user.save();
        res.status(200).json({
            message: "User verified successfully!",
            user,
        });
    }
    catch (error) {
        console.log("error===", error.message);
        next(error);
    }
});
exports.verifyAccount = verifyAccount;
const resendOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield User_model_1.default.findOne({
            where: {
                MobileNo,
            },
            paranoid,
        });
        console.log("user.Status===", user.Status);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        // if (user!.Status) {
        //   console.log("user.Status===", user.Status);
        //   return res.status(400).json({
        //     message: "User is already verified!",
        //   });
        // }
        const { OTP, OtpExpiryDate } = (0, generateOTP_1.default)();
        user.set("OTP", OTP);
        user.set("OtpExpiryDate", OtpExpiryDate);
        yield user.save({
            fields: ["OTP", "OtpExpiryDate"],
        });
        res.status(200).json({
            message: "OTP sent successfully!",
            user,
        });
    }
    catch (error) {
        console.log("error===", error.message);
        next(error);
    }
});
exports.resendOTP = resendOTP;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // reset password by verifying OTP
    const { MobileNo, OTP, Password } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    const currentDate = new Date();
    try {
        const user = yield User_model_1.default.findOne({
            where: {
                MobileNo,
            },
            paranoid,
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        else if (!user.OTP) {
            return res.status(400).json({
                message: "OTP is not generated!",
            });
        }
        else if (user.OTP !== OTP) {
            return res.status(400).json({
                message: "Invalid OTP!",
            });
        }
        else if (!user.OtpExpiryDate) {
            return res.status(400).json({
                message: "OTP is not generated!",
            });
        }
        else if (user.OtpExpiryDate < currentDate) {
            return res.status(400).json({
                message: "OTP is expired!",
            });
        }
        user.set("Password", Password);
        user.set("OTP", null);
        user.set("OtpExpiryDate", null);
        yield user.save();
        res.status(200).json({
            message: "Password reset successfully!",
            user,
        });
    }
    catch (error) {
        console.log("error===", error.message);
        next(error);
    }
});
exports.resetPassword = resetPassword;
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "Signout should be implemented at the Frontend side!",
    });
});
exports.signout = signout;
