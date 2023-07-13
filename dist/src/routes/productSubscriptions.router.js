"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productSubscriptions_controller_1 = require("../controllers/productSubscriptions.controller");
const router = (0, express_1.Router)();
router.get("", productSubscriptions_controller_1.getUserSubscriptions);
router.post("", productSubscriptions_controller_1.subscribeProduct);
exports.default = router;
