"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productSubscriptions_controller_1 = require("../controllers/productSubscriptions.controller");
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const walletBalance_middleware_1 = __importDefault(require("../middlewares/walletBalance.middleware"));
const router = (0, express_1.Router)();
router.get("", productSubscriptions_controller_1.getUserSubscriptions, handleSequelizeError_1.default);
router.post("", walletBalance_middleware_1.default, productSubscriptions_controller_1.subscribeProduct, handleSequelizeError_1.default);
router.patch("/:SubscriptionGUID", productSubscriptions_controller_1.calcelSubscription, handleSequelizeError_1.default);
exports.default = router;
