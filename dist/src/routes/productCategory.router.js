"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// a route for products
const express_1 = __importDefault(require("express"));
const productCategory_controller_1 = require("../controllers/productCategory.controller");
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const router = express_1.default.Router();
exports.default = router;
router.get("/", productCategory_controller_1.getAllProductCategories);
router.get("/:ProductCategoryGUID", productCategory_controller_1.getProductCategoryById);
router.post("/", productCategory_controller_1.createProductCategory, handleSequelizeError_1.default);
router.delete("/:ProductCategoryGUID", productCategory_controller_1.deleteProductCategory);
