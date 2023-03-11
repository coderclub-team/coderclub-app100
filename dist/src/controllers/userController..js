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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_model_1.default.findAll({
            attributes: {
                exclude: [
                    "CreatedGUID",
                    "ModifiedGUID",
                    "CreatedDate",
                    "ModifiedDate",
                    "DeletedDate",
                ],
            },
        });
        return res.status(200).json({
            message: "Users fetched successfully!",
            users,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo } = req.params;
    try {
        const user = yield User_model_1.default.findByPk(MobileNo, {
            attributes: {
                exclude: [
                    "CreatedGUID",
                    "ModifiedGUID",
                    "CreatedDate",
                    "ModifiedDate",
                    "DeletedDate",
                ],
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        return res.status(200).json({
            message: "User fetched successfully!",
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
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo } = req.params;
    const { Password } = req.body;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(Password)) {
        return res.status(400).json({
            message: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
        });
    }
    try {
        const user = yield User_model_1.default.findByPk(MobileNo, {
            attributes: {
                exclude: [
                    "CreatedGUID",
                    "ModifiedGUID",
                    "CreatedDate",
                    "ModifiedDate",
                    "DeletedDate",
                ],
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        req.body.ModifiedGUID = req.body.user.UserGUID;
        yield user.update(req.body, {
            exclude: ["UserGUID", "CreatedGUID", "MobileNo"],
        });
        return res.status(200).json({
            message: "User updated successfully!",
            user,
        });
    }
    catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                success: false,
                msg: error.errors.map((e) => e.message),
            });
        }
        else {
            return res.status(500).json({
                message: "Something went wrong!",
                error: error.message,
            });
        }
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo } = req.params;
    try {
        const user = yield User_model_1.default.findByPk(MobileNo, {
            attributes: {
                exclude: ["DeletedGUID", "ModifiedGUID", "CreatedDate", "ModifiedDate"],
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        yield user.destroy();
        return res.status(200).json({
            message: "User deleted successfully!",
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
exports.deleteUserById = deleteUserById;
