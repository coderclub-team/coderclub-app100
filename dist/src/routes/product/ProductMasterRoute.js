"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router for product Product master
const express_1 = __importDefault(require("express"));
const productMasterController_1 = require("../../controllers/product/productMasterController");
const router = express_1.default.Router();
router.get("/", productMasterController_1.getAllProductMasters);
router.get("/:ProductMasterGUID", productMasterController_1.getProductMasterById);
router.post("/", productMasterController_1.createProductMaster);
router.put("/:ProductMasterGUID", productMasterController_1.updateProductMaster);
router.delete("/:ProductMasterGUID", productMasterController_1.deleteProductMaster);
exports.default = router;
