"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const userController_1 = require("../controllers/userController.");
const router = express_1.default.Router();
router.post("", userController_1.createAddress, handleSequelizeError_1.default);
router.put("/:AddressGUID", userController_1.updateAddress, handleSequelizeError_1.default);
router.delete("/:AddressGUID", userController_1.deleteAddress, handleSequelizeError_1.default);
exports.default = router;
