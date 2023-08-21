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
exports.addCartItem = exports.getCartItems = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const user_address_model_1 = __importDefault(require("../models/user-address.model"));
const cart_item_1 = __importDefault(require("../models/cart-item"));
const sequelize_1 = require("sequelize");
const product_master_model_1 = __importDefault(require("../models/product-master.model"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    try {
        const users = yield user_model_1.default.findAll({
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
            include: [user_address_model_1.default],
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
        const user = yield user_model_1.default.findOne({
            where: {
                UserGUID,
            },
            paranoid,
            include: [user_address_model_1.default],
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
    console.log("req.body===>", JSON.stringify(req.body.user));
    res.status(200).json({ message: "User updated successfully!" });
    // const { UserGUID } = req.body.user;
    // const { deleted } = req.query;
    // const paranoid = deleted === "true" ? false : true;
    // if (req.file) {
    //   const { filename, path: tmpPath } = req.file;
    //   req.body.tmpPath = tmpPath;
    //   req.body.uploadPath = path.join(
    //     userImageUploadOptions.relativePath,
    //     filename
    //   );
    //   req.body.PhotoPath = path.join(userImageUploadOptions.directory, filename);
    // }
    // try {
    //   let user = await User.findByPk(UserGUID, {
    //     paranoid,
    //   });
    //   if (user && user.DeletedDate && !paranoid) {
    //     await user.restore();
    //     // user.DeletedDate = null;
    //   } else if (!user) {
    //     return res.status(400).json({ message: "User not found!" });
    //   }
    //   const oldPhotoPath = user.PhotoPath;
    //   delete req.body.MobileNo;
    //   delete req.body.Password;
    //   Object.keys(req.body).forEach((key: string) => {
    //     if (user) {
    //       user.setDataValue(key, req.body[key]);
    //     }
    //   });
    //   if (req.body.tmpPath && req.body.uploadPath) {
    //     fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
    //       if (err) console.log(err);
    //       else {
    //         user?.setFullURL(req, "PhotoPath");
    //       }
    //     });
    //   }
    //   if (oldPhotoPath && oldPhotoPath !== user.PhotoPath) {
    //     fs.unlink(
    //       path.join(
    //         userImageUploadOptions.relativePath,
    //         path.basename(oldPhotoPath)
    //       ),
    //       (err) => {
    //         if (err) console.log(err);
    //         else console.log("Old photo deleted successfully!");
    //       }
    //     );
    //   }
    //   await user.save();
    //   res.status(201).json({ message: "User updated successfully!", user: user });
    // } catch (error) {
    //   next(error);
    // }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleted } = req.query;
    const { UserGUID } = req.params;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield user_model_1.default.findOne({
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
const getCartItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.CreatedGUID = req.body.user.UserGUID;
    try {
        const cartItems = yield cart_item_1.default.findAll({
            where: {
                CreatedGUID: {
                    [sequelize_1.Op.eq]: req.body.CreatedGUID,
                },
            },
            include: [product_master_model_1.default],
        });
        cartItems === null || cartItems === void 0 ? void 0 : cartItems.forEach((item) => {
            var _a;
            return (_a = item.Product) === null || _a === void 0 ? void 0 : _a.setFullURL(req, "PhotoPath");
        });
        res.status(200).send({
            CartItem: cartItems,
            CartTotal: yield cartTotal(req)
        });
    }
    catch (error) {
        console.log("message===>", error === null || error === void 0 ? void 0 : error.message);
        next(error);
    }
});
exports.getCartItems = getCartItems;
const addCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserGUID } = req.body.user;
    const { Quantity, ProductGUID } = req.body;
    if (!ProductGUID || !Quantity) {
        throw Error("ProductGUID and Quantity is required to add cart item!");
    }
    try {
        //  mutating existing item
        const item = yield cart_item_1.default.findOne({
            where: {
                ProductGUID,
                CreatedGUID: UserGUID,
            },
            include: [product_master_model_1.default],
        });
        if (item) {
            item.Quantity += req.body.Quantity;
            if (item.Quantity < 0) {
                throw Error(`Cart item quantity ${item.Quantity} not allowed!`);
            }
            else if (item.Quantity === 0) {
                item.destroy();
                return res.status(200).send({
                    message: "CartItem deleted successfully!",
                    CartItem: null,
                    cartTotal: yield cartTotal(req)
                });
            }
            yield item.save();
            return res.status(200).send({
                message: "CartItem updated successfully!",
                CartItem: item,
                cartTotal: yield cartTotal(req)
            });
        }
        //  mutating existing item
        if (req.body.Quantity < 1) {
            throw Error("Minimum Quantity is required to add cart item!");
        }
        const cartitem = yield cart_item_1.default.create(Object.assign(Object.assign({}, req.body), { CreatedGUID: UserGUID }), {
            include: [product_master_model_1.default],
        });
        res.status(200).send({
            message: "CartItem added successfully!",
            CartItem: cartitem,
            cartTotal: yield cartTotal(req),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addCartItem = addCartItem;
const cartTotal = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserGUID } = req.body.user;
    const items = yield cart_item_1.default.findAll({
        where: {
            CreatedGUID: {
                [sequelize_1.Op.eq]: UserGUID,
            },
        },
        include: [product_master_model_1.default],
    });
    const total = items.reduce((acc, item) => {
        var _a, _b, _c;
        const qty = item === null || item === void 0 ? void 0 : item.getDataValue("Quantity");
        const sale_price = ((_a = item === null || item === void 0 ? void 0 : item.Product) === null || _a === void 0 ? void 0 : _a.getDataValue("SaleRate")) ||
            ((_b = item === null || item === void 0 ? void 0 : item.Product) === null || _b === void 0 ? void 0 : _b.getDataValue("UnitPrice")) ||
            ((_c = item === null || item === void 0 ? void 0 : item.Product) === null || _c === void 0 ? void 0 : _c.getDataValue("MRP"));
        return acc + qty * sale_price;
    }, 0);
    return total;
});