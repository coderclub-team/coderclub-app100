// router for product Product master
import express from "express";

import {
  createProductMaster,
  deleteProductMaster,
  getAllProductMasters,
  getProductMasterById,
  updateProductMaster,
} from "../../controllers/product/productMaster.controller";

const router = express.Router();

router.get("/", getAllProductMasters);
router.get("/:ProductMasterGUID", getProductMasterById);
router.post("/", createProductMaster);
router.put("/:ProductMasterGUID", updateProductMaster);
router.delete("/:ProductMasterGUID", deleteProductMaster);

export default router;
