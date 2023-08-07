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
exports.deleteCartItem = exports.addCartItem = exports.getCartItems = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const config_1 = require("../../config");
const decodeJWT_1 = __importDefault(require("../utils/decodeJWT"));
const UserAddress_model_1 = __importDefault(require("../models/UserAddress.model"));
const CartItem_model_1 = __importDefault(require("../models/CartItem.model"));
const sequelize_1 = require("sequelize");
const ProductMaster_model_1 = __importDefault(require("../models/product/ProductMaster.model"));
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
            include: [UserAddress_model_1.default],
        });
        users.forEach((user) => {
            user.setFullURL(req, "PhotoPath");
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
            include: [UserAddress_model_1.default],
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }
        user.setFullURL(req, "PhotoPath");
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserGUID } = req.body.user || (0, decodeJWT_1.default)(req);
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
        Object.keys(req.body).forEach((key) => {
            if (user) {
                user.setDataValue(key, req.body[key]);
            }
        });
        if (req.body.tmpPath && req.body.uploadPath) {
            node_fs_1.default.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
                if (err)
                    console.log(err);
                else {
                    user === null || user === void 0 ? void 0 : user.setFullURL(req, "PhotoPath");
                }
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
        yield user.save();
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
// Manage user addresses
// export const getAllAddresses = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.body.user) {
//     req.body.CreatedGUID = req.body.user.UserGUID;
//   } else {
//     req.body.CreatedGUID = decodeJWT(req).UserGUID;
//   }
// };
const getCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    try {
        const cartItems = yield CartItem_model_1.default.findAll({
            where: {
                CreatedGUID: {
                    [sequelize_1.Op.eq]: req.body.CreatedGUID,
                },
            },
            include: [ProductMaster_model_1.default],
        });
        res.status(200).send(cartItems);
    }
    catch (error) {
        console.log("message===>", error === null || error === void 0 ? void 0 : error.message);
        next(error);
    }
});
exports.getCartItems = getCartItems;
const addCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    try {
        if (!req.body.ProductGUID) {
            throw Error("ProductGUID is required to add cart item!");
        }
        if (!req.body.Quantity) {
            throw Error("Quantity is required to add cart item!");
        }
        const existingCartItem = yield CartItem_model_1.default.findOne({
            where: {
                ProductGUID: req.body.ProductGUID,
                CreatedGUID: req.body.CreatedGUID,
            },
            include: [ProductMaster_model_1.default],
        });
        if (existingCartItem) {
            existingCartItem.Quantity =
                (existingCartItem === null || existingCartItem === void 0 ? void 0 : existingCartItem.Quantity) + req.body.Quantity;
            if (existingCartItem.Quantity < 0) {
                throw Error(`Cart item quantity ${existingCartItem.Quantity} not allowed!`);
            }
            if (existingCartItem.Quantity === 0) {
                existingCartItem.destroy();
                return res.status(200).send({
                    message: "CartItem deleted successfully!",
                    CartItem: null,
                });
            }
            existingCartItem.save();
            return res.status(200).send({
                message: "CartItem updated successfully!",
                CartItem: existingCartItem,
            });
        }
        if (req.body.Quantity < 1) {
            throw Error("Minimum Quantity is required to add cart item!");
        }
        const cartitem = yield CartItem_model_1.default.create(req.body);
        res.status(200).send({
            message: "CartItem added successfully!",
            cartitem,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addCartItem = addCartItem;
const deleteCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteCartItem = deleteCartItem;
