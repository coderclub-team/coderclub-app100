"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router for product sub category
const express_1 = __importDefault(require("express"));
const productSubCategoryController_1 = require("../../controllers/product/productSubCategoryController");
const router = express_1.default.Router();
router.get("/", productSubCategoryController_1.getAllProductSubCategories);
router.get("/:ProductSubCategoryGUID", productSubCategoryController_1.getProductSubCategoryById);
router.post("/", productSubCategoryController_1.createProductSubCategory);
router.put("/:ProductSubCategoryGUID", productSubCategoryController_1.updateProductSubCategory);
router.delete("/:ProductSubCategoryGUID", productSubCategoryController_1.deleteProductSubCategory);
exports.default = router;
