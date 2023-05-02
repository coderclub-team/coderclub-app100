"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// a route for products
const express_1 = __importDefault(require("express"));
const IProduct_controller_1 = require("../../controllers/IProducts/IProduct.controller");
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../../../config");
const router = express_1.default.Router();
exports.default = router;
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
router.get("/", IProduct_controller_1.getAllIProducts);
router.get("/:IProductGUID", IProduct_controller_1.getIProductById);
router.post("/", upload.none(), IProduct_controller_1.createIProduct);
