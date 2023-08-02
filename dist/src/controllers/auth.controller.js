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
exports.cancelOrder = exports.createOrder = exports.getOrders = exports.signout = exports.resetPassword = exports.forgotPassword = exports.sendOTP = exports.verifyAccount = exports.getCurrentUser = exports.login = exports.register = void 0;
const node_path_1 = __importDefault(require("node:path"));
const User_model_1 = __importDefault(require("../models/User.model"));
const node_fs_1 = __importDefault(require("node:fs"));
const config_1 = require("../../config");
const custom_error_1 = require("../../custom.error");
const decodeJWT_1 = __importDefault(require("../utils/decodeJWT"));
const Sale_model_1 = __importDefault(require("../models/Sale.model"));
const GlobalType_model_1 = __importDefault(require("../models/GlobalType.model"));
const SaleDetail_model_1 = __importDefault(require("../models/SaleDetail.model"));
const UserAddress_model_1 = __importDefault(require("../models/UserAddress.model"));
const database_1 = require("../database");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const { filename, path: tmpPath } = req.file;
        req.body.tmpPath = tmpPath;
        req.body.uploadPath = node_path_1.default.join(config_1.userImageUploadOptions.relativePath, filename);
        req.body.PhotoPath = node_path_1.default.join(config_1.userImageUploadOptions.directory, filename);
    }
    try {
        const createdUser = yield User_model_1.default.create(req.body);
        if (!createdUser) {
            throw new custom_error_1.UserNotFoundExceptionError("User not found!");
        }
        if (req.file) {
            node_fs_1.default.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            createdUser.PhotoPath = node_path_1.default.join(req.protocol + "://" + req.get("host"), createdUser.PhotoPath);
        }
        // const token = await createdUser.authenticate(req.body.Password);
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
        const user = yield User_model_1.default.findOne({
            where: {
                MobileNo: MobileNo,
            },
            include: [UserAddress_model_1.default],
        });
        if (!user) {
            throw new custom_error_1.UserNotFoundExceptionError("User not found!");
        }
        const imageKey = "PhotoPath";
        const imagePath = user === null || user === void 0 ? void 0 : user[imageKey];
        if (!imagePath)
            return;
        const host = req.protocol + "://" + req.get("host");
        const imageFullPath = new URL(node_path_1.default.join(host, imagePath));
        user.setDataValue("PhotoPath", imageFullPath);
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
        let authuser;
        if (req.body.user) {
            authuser = req.body.user;
        }
        else {
            authuser = (0, decodeJWT_1.default)(req);
        }
        const user = yield User_model_1.default.findByPk(authuser.UserGUID, {
            attributes: {
                exclude: ["Password"],
            },
            include: [UserAddress_model_1.default],
        });
        const imageKey = "PhotoPath";
        const imagePath = user === null || user === void 0 ? void 0 : user[imageKey];
        if (!imagePath)
            return;
        const host = req.protocol + "://" + req.get("host");
        const imageFullPath = new URL(node_path_1.default.join(host, imagePath));
        user.setDataValue("PhotoPath", imageFullPath);
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
        const user = yield User_model_1.default.findOne({
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
        const user = yield User_model_1.default.findOne({
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
    const { MobileNo, OTP, Password } = req.body;
    const { deleted } = req.query;
    const paranoid = deleted === "true" ? false : true;
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
        yield user.resetPassword(Password, OTP);
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
    const salemasters = yield Sale_model_1.default.findAll({
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
                model: GlobalType_model_1.default,
                as: "SaleTypeRef",
                //  Sale type shoudl be astring value of arributes.GlobaleTypeName
                attributes: {
                    include: ["GlobalTypeName"],
                    exclude: ["GlobalTypeGUID"],
                },
            },
            {
                model: SaleDetail_model_1.default,
                all: true,
            },
        ],
    });
    salemasters.forEach((sale) => {
        if (sale.SaleTypeRef) {
            sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
            sale.setDataValue("SaleTypeRef", undefined);
        }
    });
    res.json(salemasters);
});
exports.getOrders = getOrders;
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const transaction = yield database_1.sequelize.transaction();
    try {
        const { SaleOrderID, SaleOrderDate, ModeOfPayment, SaleChannel, SalePlatform, CustomerGUID = req.body.user.UserGUID, SalesDetails, CreatedGUID, } = req.body;
        const saleData = {
            SaleOrderID,
            SaleOrderDate,
            SaleChannel,
            CustomerGUID,
            CreatedGUID,
            SalePlatform,
            ModeOfPayment
        };
        if (!SaleOrderDate) {
            throw new Error("SaleOrderDate is required");
        }
        else if (!SaleOrderID) {
            throw new Error("SaleOrderID is required");
        }
        else if (!ModeOfPayment) {
            throw new Error("ModeOfPayment is required");
        }
        else if (!SaleChannel) {
            throw new Error("SaleChannel is required");
        }
        else if (!SalePlatform) {
            throw new Error("SalePlatform is required");
        }
        SalesDetails.forEach((saleDetail) => {
            if (!saleDetail.ProductGUID) {
                throw new Error("ProductGUID is required");
            }
            else if (!saleDetail.Quantity) {
                throw new Error("Quantity is required");
            }
            else if (!saleDetail.Amount) {
                throw new Error("Amount is required");
            }
        });
        if (!Array.isArray(SalesDetails)) {
            throw new Error("SaleDetails should be an array");
        }
        const sale = yield Sale_model_1.default.create(saleData, { transaction });
        const saleDetails = yield SaleDetail_model_1.default.bulkCreate(SalesDetails.map((saleDetail) => (Object.assign({ SalesMasterGUID: sale.SalesMasterGUID }, saleDetail))), { transaction });
        transaction.commit();
        res.json(Object.assign(Object.assign({}, sale), { SaleDetails: saleDetails }));
    }
    catch (error) {
        transaction.rollback();
        next(error);
    }
});
exports.createOrder = createOrder;
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
        const sale = yield Sale_model_1.default.findByPk(SalesMasterGUID, { transaction });
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
