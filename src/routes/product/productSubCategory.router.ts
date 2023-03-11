// router for product sub category
import express from "express";
import {
  createProductSubCategory,
  deleteProductSubCategory,
  getAllProductSubCategories,
  getProductSubCategoryById,
  updateProductSubCategory,
} from "../../controllers/product/productSubCategory.controller";
import { Op } from "sequelize";
const router = express.Router();
router.get("/", getAllProductSubCategories);
router.get("/:ProductSubCategoryGUID", getProductSubCategoryById);
router.post("/", createProductSubCategory);
router.put("/:ProductSubCategoryGUID", updateProductSubCategory);
router.delete("/:ProductSubCategoryGUID", deleteProductSubCategory);

export default router;
