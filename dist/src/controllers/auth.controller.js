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
exports.cancelOrder = exports.getOrders = exports.signout = exports.resetPassword = exports.forgotPassword = exports.sendOTP = exports.verifyAccount = exports.getCurrentUser = exports.login = exports.register = void 0;
const node_path_1 = __importDefault(require("node:path"));
const user_model_1 = __importDefault(require("../models/user.model"));
const node_fs_1 = __importDefault(require("node:fs"));
const config_1 = require("../../config");
const custom_error_1 = require("../../custom.error");
const sale_model_1 = __importDefault(require("../models/sale.model"));
const global_type_model_1 = __importDefault(require("../models/global-type.model"));
const sale_detail_model_1 = __importDefault(require("../models/sale-detail.model"));
const user_address_model_1 = __importDefault(require("../models/user-address.model"));
const database_1 = require("../database");
const product_master_model_1 = __importDefault(require("../models/product-master.model"));
const promotion_model_1 = require("../models/promotion.model");
const product_subscription_model_1 = __importDefault(require("../models/product-subscription.model"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const { filename, path: tmpPath } = req.file;
        req.body.tmpPath = tmpPath;
        req.body.uploadPath = node_path_1.default.join(config_1.userImageUploadOptions.relativePath, filename);
        req.body.PhotoPath = node_path_1.default.join(config_1.userImageUploadOptions.directory, filename);
    }
    console.log("register", req.body);
    try {
        const createdUser = yield user_model_1.default.create(req.body);
        if (!createdUser) {
            throw new custom_error_1.UserNotFoundExceptionError("User not found!");
        }
        if (req.file) {
            node_fs_1.default.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            createdUser.setFullURL(req, "PhotoPath");
        }
        return res.status(201).json({
            message: "User created successfully!",
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
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo, Password } = req.body;
    try {
        if (!MobileNo || !Password) {
            throw new Error("MobileNo or Password is missing");
        }
        const user = yield user_model_1.default.findOne({
            where: {
                MobileNo: MobileNo,
            },
            include: [user_address_model_1.default, product_subscription_model_1.default],
        });
        if (!user) {
            throw new custom_error_1.UserNotFoundExceptionError("User not found!");
        }
        user.setFullURL(req, "PhotoPath");
        const token = yield (user === null || user === void 0 ? void 0 : user.authenticate(Password));
        res.status(200).json({
            message: "Login successful!",
            user,
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get user fromtoken
    try {
        console.log("auth_user==>", req.body.user);
        const user = yield user_model_1.default.findByPk(req.body.user.UserGUID, {
            attributes: {
                exclude: ["Password"],
            },
            include: [user_address_model_1.default],
        });
        user === null || user === void 0 ? void 0 : user.setFullURL(req, "PhotoPath");
        res.json([user]);
    }
    catch (error) {
        next(error);
    }
});
exports.getCurrentUser = getCurrentUser;
const verifyAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo, OTP } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield user_model_1.default.findOne({
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
        yield user.verifyOTP(OTP);
        res.status(200).json({
            message: "User verified successfully!",
            user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAccount = verifyAccount;
const sendOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield user_model_1.default.findOne({
            where: {
                MobileNo,
            },
            paranoid,
        });
        if (!user) {
            throw new custom_error_1.UserNotFoundExceptionError("User not found!");
        }
        yield (user === null || user === void 0 ? void 0 : user.sendOTP());
        res.status(200).json({
            message: "OTP sent successfully!",
            user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendOTP = sendOTP;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { MobileNo } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield user_model_1.default.findOne({
            where: {
                MobileNo,
            },
            paranoid,
        });
        if (!user) {
            throw new custom_error_1.UserNotFoundExceptionError("User not found!");
        }
        yield (user === null || user === void 0 ? void 0 : user.sendOTP());
        res.status(200).json({
            message: "OTP sent successfully!",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // reset password by verifying OTP
    const { MobileNo, OTP, Password, EmailAddress } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
    try {
        const user = yield user_model_1.default.findOne({
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
        yield user.resetPassword(Password, OTP, EmailAddress, MobileNo);
        res.status(200).json({
            message: "Password reset successfully!",
            user,
        });
    }
    catch (error) {
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
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const salemasters = yield sale_model_1.default.findAll({
        where: {
            CustomerGUID: req.body.user.UserGUID,
        },
        attributes: {
            exclude: ["CustomerGUID", "SaleTypeRef"],
        },
        include: [
            // {
            //   model: User,
            //   as: "Customer",
            // },
            {
                model: global_type_model_1.default,
                as: "SaleTypeRef",
                //  Sale type shoudl be astring value of arributes.GlobaleTypeName
                attributes: {
                    include: ["GlobalTypeName"],
                    exclude: ["GlobalTypeGUID"],
                },
            },
            {
                model: sale_detail_model_1.default,
                all: true,
                include: [
                    {
                        model: product_master_model_1.default,
                    },
                ],
            },
            {
                model: promotion_model_1.Promotion,
            },
        ],
    });
    salemasters === null || salemasters === void 0 ? void 0 : salemasters.forEach((sale) => {
        var _a;
        (_a = sale === null || sale === void 0 ? void 0 : sale.SaleDetails) === null || _a === void 0 ? void 0 : _a.forEach((saleDetail) => {
            var _a;
            (_a = saleDetail === null || saleDetail === void 0 ? void 0 : saleDetail.product) === null || _a === void 0 ? void 0 : _a.setFullURL(req, "PhotoPath");
        });
        if (sale.SaleTypeRef) {
            sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
            sale.setDataValue("SaleTypeRef", undefined);
        }
    });
    res.json(salemasters);
});
exports.getOrders = getOrders;
const cancelOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { SalesMasterGUID } = req.params;
    if (!SalesMasterGUID) {
        throw new Error("SalesMasterGUID is required");
    }
    else if (!req.body.Status) {
        throw new Error("Status is required");
    }
    const transaction = yield database_1.sequelize.transaction();
    try {
        const sale = yield sale_model_1.default.findByPk(SalesMasterGUID, { transaction });
        if (!sale) {
            throw new Error("Sale not found!");
        }
        sale.Status = req.body.Status;
        const user = yield sale.save({ transaction });
        transaction.commit();
        res.json({
            message: "Sale updated successfully!",
            user,
        });
    }
    catch (error) {
        transaction.rollback();
        next(error);
    }
});
exports.cancelOrder = cancelOrder;
