"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const userAddress_conroller_1 = require("../controllers/userAddress.conroller");
const router = express_1.default.Router();
router.post("", userAddress_conroller_1.createAddress, handleSequelizeError_1.default);
router.put("/:AddressGUID", userAddress_conroller_1.updateAddress, handleSequelizeError_1.default);
router.delete("/:AddressGUID", userAddress_conroller_1.deleteAddress, handleSequelizeError_1.default);
exports.default = router;
