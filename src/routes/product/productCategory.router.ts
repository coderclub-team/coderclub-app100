// a route for products
import express from "express";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoryById,
} from "../../controllers/product/productCategory.controller";
import handleSequelizeError from "../../middlewares/handleSequelizeError";

const router = express.Router();
export default router;

router.get("/", getAllProductCategories);
router.get("/:ProductCategoryGUID", getProductCategoryById);
router.post("/", createProductCategory, handleSequelizeError);
router.delete("/:ProductCategoryGUID", deleteProductCategory);
