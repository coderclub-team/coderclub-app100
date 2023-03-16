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
router.get("/:ProductMasterGUID", productMaster_controller_1.getProductMasterById);
router.post("/", upload.single("file"), productMaster_controller_1.createProductMaster, handleSequelizeError_1.default);
router.put("/:ProductMasterGUID", productMaster_controller_1.updateProductMaster, handleSequelizeError_1.default);
router.delete("/:ProductMasterGUID", productMaster_controller_1.deleteProductMaster);
exports.default = router;
