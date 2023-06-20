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
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const config_1 = require("../../config");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
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
            paranoid,
        });
        users.forEach((user) => {
            const imageKey = "PhotoPath";
            const imagePath = user === null || user === void 0 ? void 0 : user[imageKey];
            if (!imagePath)
                return;
            const host = req.protocol + "://" + req.get("host");
            const imageFullPath = node_path_1.default.join(host, imagePath);
            user.setDataValue("PhotoPath", imageFullPath);
        });
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserGUID } = req.params;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield User_model_1.default.findOne({
            where: {
                UserGUID,
            },
            paranoid,
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        const imageKey = "PhotoPath";
        const imagePath = user === null || user === void 0 ? void 0 : user[imageKey];
        if (!imagePath)
            return;
        const host = req.protocol + "://" + req.get("host");
        const imageFullPath = node_path_1.default.join(host, imagePath);
        user.setDataValue("PhotoPath", imageFullPath);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserGUID } = req.params;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    if (req.file) {
        const { filename, path: tmpPath } = req.file;
        req.body.tmpPath = tmpPath;
        req.body.uploadPath = node_path_1.default.join(config_1.userImageUploadOptions.relativePath, filename);
        req.body.PhotoPath = node_path_1.default.join(config_1.userImageUploadOptions.directory, filename);
    }
    try {
        let user = yield User_model_1.default.findByPk(UserGUID, {
            paranoid,
        });
        if (user && user.DeletedDate && !paranoid) {
            yield user.restore();
            // user.DeletedDate = null;
        }
        else if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        const oldPhotoPath = user.PhotoPath;
        delete req.body.MobileNo;
        delete req.body.Password;
        yield user.save(req.body);
        if (req.body.tmpPath && req.body.uploadPath) {
            node_fs_1.default.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
                if (err)
                    console.log(err);
                else
                    user.PhotoPath = node_path_1.default.join(req.protocol + "://" + req.get("host"), user.PhotoPath);
            });
        }
        if (oldPhotoPath && oldPhotoPath !== user.PhotoPath) {
            node_fs_1.default.unlink(node_path_1.default.join(config_1.userImageUploadOptions.relativePath, node_path_1.default.basename(oldPhotoPath)), (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("Old photo deleted successfully!");
            });
        }
        res.status(201).json({ message: "User updated successfully!", user: user });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleted } = req.query;
    const { UserGUID } = req.params;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield User_model_1.default.findOne({
            where: {
                UserGUID,
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        yield user.destroy({
            force: !paranoid,
        });
        return res.status(200).json({
            message: "User deleted successfully!",
            user,
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.deleteUserById = deleteUserById;
