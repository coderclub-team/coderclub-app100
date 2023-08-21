"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promotion_controller_1 = require("../controllers/promotion.controller");
const router = express_1.default.Router();
router.get('/', promotion_controller_1.getAllPromotions);
exports.default = router;
