"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router for product Product master
const express_1 = __importDefault(require("express"));
const productMaster_controller_1 = require("../../controllers/product/productMaster.controller");
const handleSequelizeError_1 = __importDefault(require("../../middlewares/handleSequelizeError"));
const router = express_1.default.Router();
router.get("/", productMaster_controller_1.getAllProductMasters);
router.get("/:ProductMasterGUID", productMaster_controller_1.getProductMasterById);
router.post("/", productMaster_controller_1.createProductMaster);
router.put("/:ProductMasterGUID", productMaster_controller_1.updateProductMaster, handleSequelizeError_1.default);
router.delete("/:ProductMasterGUID", productMaster_controller_1.deleteProductMaster);
exports.default = router;
