"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router for product sub category
const express_1 = __importDefault(require("express"));
const productSubCategory_controller_1 = require("../../controllers/product/productSubCategory.controller");
const router = express_1.default.Router();
router.get("/", productSubCategory_controller_1.getAllProductSubCategories);
router.get("/:ProductSubCategoryGUID", productSubCategory_controller_1.getProductSubCategoryById);
router.post("/", productSubCategory_controller_1.createProductSubCategory);
router.put("/:ProductSubCategoryGUID", productSubCategory_controller_1.updateProductSubCategory);
router.delete("/:ProductSubCategoryGUID", productSubCategory_controller_1.deleteProductSubCategory);
exports.default = router;
