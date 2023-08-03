"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const userWallet_controller_1 = require("../controllers/userWallet.controller");
const router = express_1.default.Router();
router.get("/", userWallet_controller_1.getWalletTransactions, handleSequelizeError_1.default);
router.get("/balance", userWallet_controller_1.getWalletBalance, handleSequelizeError_1.default);
router.post("/", userWallet_controller_1.creditOrDebit, handleSequelizeError_1.default);
exports.default = router;
