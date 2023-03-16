// router for product Product master
import express from "express";
import multer from "multer";
import { productImageUploadOptions } from "../../../config";

import {
  createProductMaster,
  deleteProductMaster,
  getAllProductMasters,
  getProductMasterById,
  updateProductMaster,
} from "../../controllers/product/productMaster.controller";
import handleSequelizeError from "../../middlewares/handleSequelizeError";

const router = express.Router();
const upload = multer({
  storage: productImageUploadOptions.storage,
  limits: productImageUploadOptions.limits,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/", getAllProductMasters);
router.get("/:ProductMasterGUID", getProductMasterById);
router.post(
  "/",
  upload.single("file"),
  createProductMaster,
  handleSequelizeError
);
router.put("/:ProductMasterGUID", updateProductMaster, handleSequelizeError);
router.delete("/:ProductMasterGUID", deleteProductMaster);

export default router;
