"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router for product Product master
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../../../config");
const productMaster_controller_1 = require("../../controllers/product/productMaster.controller");
const handleSequelizeError_1 = __importDefault(require("../../middlewares/handleSequelizeError"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: config_1.productImageUploadOptions.storage,
    limits: config_1.productImageUploadOptions.limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});
router.get("/", productMaster_controller_1.getAllProductMasters);
router.get("/searchproduct", productMaster_controller_1.getProductByQuery);
router.post("/", upload.fields([
    { name: "PhotoPath", maxCount: 1 },
    {
        name: "GalleryPhotoPath1",
        maxCount: 1,
    },
    { name: "GalleryPhotoPath2", maxCount: 1 },
    { name: "GalleryPhotoPath3", maxCount: 1 },
    { name: "GalleryPhotoPath4", maxCount: 1 },
]), productMaster_controller_1.createProductMaster, handleSequelizeError_1.default);
router.put("/:ProductMasterGUID", productMaster_controller_1.updateProductMaster, handleSequelizeError_1.default);
router.delete("/:ProductMasterGUID", productMaster_controller_1.deleteProductMaster);
// attributes
router.post("/:productGUID/attributes", productMaster_controller_1.createAttribute);
exports.default = router;
