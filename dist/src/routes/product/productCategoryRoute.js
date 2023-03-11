"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// a route for products
const express_1 = __importDefault(require("express"));
const productCategoryController_1 = require("../../controllers/product/productCategoryController");
const router = express_1.default.Router();
exports.default = router;
router.get("/", productCategoryController_1.getAllProductCategories);
router.get("/:ProductCategoryGUID", productCategoryController_1.getProductCategoryById);
router.post("/", productCategoryController_1.createProductCategory);
router.put("/:ProductCategoryGUID", productCategoryController_1.updateProductCategory);
router.delete("/:ProductCategoryGUID", productCategoryController_1.deleteProductCategory);
