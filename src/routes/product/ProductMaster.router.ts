// router for product Product master
import express from "express";
import multer from "multer";
import { productImageUploadOptions } from "../../../config";

import {
  createAttribute,
  createProductMaster,
  createProductReview,
  deleteProductMaster,
  getAllProductMasters,
  getProductMasterById,

  // getProductMasterById,
  updateProductMaster,
} from "../../controllers/product/productMaster.controller";
import handleSequelizeError from "../../middlewares/handleSequelizeError";
import trimRequestBody from "../../middlewares/trimRequestBody.middleware";
import authRouter from "../auth.router";
import authGaurd from "../../middlewares/authGaurd.middleware";

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
router.get("/:ProductGUID", getProductMasterById);
// router.get("/searchproduct", getProductByQuery);
router.post(
  "/",
  upload.fields([
    { name: "PhotoPath", maxCount: 1 },
    {
      name: "GalleryPhotoPath1",
      maxCount: 1,
    },
    { name: "GalleryPhotoPath2", maxCount: 1 },
    { name: "GalleryPhotoPath3", maxCount: 1 },
    { name: "GalleryPhotoPath4", maxCount: 1 },
  ]),
  createProductMaster,
  handleSequelizeError
);
router.put("/:ProductMasterGUID", updateProductMaster, handleSequelizeError);
router.delete("/:ProductMasterGUID", deleteProductMaster);

// attributes

router.post("/:productGUID/attributes", createAttribute);

// router.get("/:productGUID/reviews", getProductReviews);
router.post("/:productGUID/reviews", authGaurd, createProductReview);

export default router;
