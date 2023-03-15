// a route for products
import express from "express";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
} from "../../controllers/product/productCategory.controller";
import handleSequelizeError from "../../middlewares/handleSequelizeError";

const router = express.Router();
export default router;

router.get("/", getAllProductCategories);
router.get("/:ProductCategoryGUID", getProductCategoryById);
router.post("/", createProductCategory, handleSequelizeError);
router.put("/:ProductCategoryGUID", updateProductCategory);
router.delete("/:ProductCategoryGUID", deleteProductCategory);
