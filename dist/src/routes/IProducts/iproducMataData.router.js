"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// a route for products
const express_1 = __importDefault(require("express"));
const IProduct_controller_1 = require("../../controllers/IProducts/IProduct.controller");
const router = express_1.default.Router();
exports.default = router;
router.get("/", IProduct_controller_1.getAllIProducts);
router.get("/:IProductGUID", IProduct_controller_1.getIProductById);
