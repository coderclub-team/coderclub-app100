"use strict";
// a auth controller to handle login and register
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
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("../models/User.model"));
const auth_1 = require("../utils/auth");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.create(req.body);
        const token = (0, auth_1.generateToken)(user);
        user.set("Password", null);
        return res.status(200).json({
            message: "Registration successful!",
            token,
            user,
        });
    }
    catch (error) {
        if (error instanceof sequelize_1.UniqueConstraintError) {
            return res.status(400).json({
                message: "User already exists!",
                error,
            });
        }
        else if (error instanceof sequelize_1.ValidationError) {
            return res.status(400).json({
                message: error.message,
                error,
            });
        }
        else if (error instanceof sequelize_1.DatabaseError) {
            return res.status(400).json({
                message: error.message,
                error,
            });
        }
        else {
            return res.status(500).json({
                message: "Something went wrong!",
                error,
            });
        }
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
        const user = yield User_model_1.default.findByPk(MobileNo, {
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
        return res.status(500).json({
            message: "Something went wrong!",
            error,
        });
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
