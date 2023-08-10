"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController.");
const handleSequelizeError_1 = __importDefault(require("../middlewares/handleSequelizeError"));
const router = express_1.default.Router();
router.get("", userController_1.getCartItems, handleSequelizeError_1.default);
router.post("", userController_1.addCartItem, handleSequelizeError_1.default);
exports.default = router;
