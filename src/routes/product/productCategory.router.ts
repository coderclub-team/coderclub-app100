// a route for products
import express from "express";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
} from "../../controllers/product/productCategory.controller";

const router = express.Router();
export default router;

router.get("/", getAllProductCategories);
router.get("/:ProductCategoryGUID", getProductCategoryById);
router.post("/", createProductCategory);
router.put("/:ProductCategoryGUID", updateProductCategory);
router.delete("/:ProductCategoryGUID", deleteProductCategory);
