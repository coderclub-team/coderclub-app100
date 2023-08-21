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
exports.getWalletBalance = exports.creditOrDebit = exports.getWalletTransactions = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const UserWallet_1 = __importDefault(require("../models/UserWallet"));
const UserWalletBalances_1 = __importDefault(require("../models/UserWalletBalances"));
const ProductSubscriptions_model_1 = __importDefault(require("../models/ProductSubscriptions.model"));
const Sale_model_1 = __importDefault(require("../models/Sale.model"));
const getWalletTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.CreatedGUID = req.body.user.UserGUID;
    try {
        const { count, rows: transactions } = yield UserWallet_1.default.findAndCountAll({
            where: {
                UserGUID: req.body.CreatedGUID,
                Status: "FULLFILLED",
            },
            include: [Sale_model_1.default, ProductSubscriptions_model_1.default],
            order: [["CreatedDate", "DESC"]],
        });
        res.json(transactions);
    }
    catch (error) {
        next(error);
    }
});
exports.getWalletTransactions = getWalletTransactions;
const creditOrDebit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.CreatedGUID = req.body.user.UserGUID;
    const { type, amount, CreatedGUID } = req.body;
    if (!amount || amount <= 0 && isNaN(amount)) {
        throw new Error("Invalid amount");
    }
    try {
        let transaction;
        if (new String(type).toUpperCase() === "CREDIT") {
            console.log("come here", CreatedGUID);
            transaction = yield UserWallet_1.default.create({
                UserGUID: CreatedGUID,
                Credit: amount,
                Debit: 0,
                CreatedGUID: CreatedGUID,
                Status: "FULLFILLED",
            });
        }
        else if (new String(type).toUpperCase() === "DEBIT") {
            const walletBalance = yield UserWalletBalances_1.default.findOne({
                where: { UserGUID: CreatedGUID },
            });
            if (walletBalance && walletBalance.Balance < amount) {
                throw new Error("Insufficient balance");
            }
            transaction = yield UserWallet_1.default.create({
                UserGUID: CreatedGUID,
                Credit: 0,
                Debit: amount,
                CreatedGUID: CreatedGUID,
                Status: "FULLFILLED",
            });
        }
        else {
            return res.status(400).json({ message: "Invalid request" });
        }
        res.json({
            message: "Transaction successful",
            transaction,
            balance: yield UserWalletBalances_1.default.findOne({
                where: { UserGUID: req.body.CreatedGUID },
            }).then((t) => t === null || t === void 0 ? void 0 : t.Balance),
        });
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
});
exports.creditOrDebit = creditOrDebit;
const getWalletBalance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.CreatedGUID = req.body.user.UserGUID;
    try {
        const balance = yield UserWalletBalances_1.default.findOne({
            where: { UserGUID: req.body.CreatedGUID },
            include: [{
                    model: User_model_1.default,
                    attributes: ['LoginName', 'UserGUID', 'FirstName', 'LastName', 'EmailAddress', 'MobileNo']
                }],
        });
        res.json([balance]);
    }
    catch (error) {
        next(error);
    }
});
exports.getWalletBalance = getWalletBalance;
