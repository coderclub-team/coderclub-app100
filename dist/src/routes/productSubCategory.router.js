"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router for product sub category
const express_1 = __importDefault(require("express"));
const productSubCategory_controller_1 = require("../controllers/productSubCategory.controller");
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const router = express_1.default.Router();
router.get("/", productSubCategory_controller_1.getAllProductSubCategories, handleSequelizeError_1.default);
router.get("/:ProductSubCategoryGUID", productSubCategory_controller_1.getProductSubCategoryById, handleSequelizeError_1.default);
router.post("/", productSubCategory_controller_1.createProductSubCategory, handleSequelizeError_1.default);
router.put("/:ProductSubCategoryGUID", productSubCategory_controller_1.updateProductSubCategory, handleSequelizeError_1.default);
router.delete("/:ProductSubCategoryGUID", productSubCategory_controller_1.deleteProductSubCategory, handleSequelizeError_1.default);
exports.default = router;
