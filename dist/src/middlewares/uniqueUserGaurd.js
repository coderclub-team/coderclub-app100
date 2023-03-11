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
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("../models/User.model"));
const uniqueUserGaurd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo, EmailAddress, LoginName } = req.body;
    try {
        const user = yield User_model_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ MobileNo }, { EmailAddress }, { LoginName }],
            },
        });
        if (user) {
            const message = user.MobileNo === MobileNo
                ? "MobileNo already exists!"
                : user.EmailAddress === EmailAddress
                    ? "EmailAddress already exists!"
                    : user.LoginName === LoginName
                        ? "LoginName already exists!"
                        : "User already exists!";
            return res.status(400).json({
                message,
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.default = uniqueUserGaurd;
