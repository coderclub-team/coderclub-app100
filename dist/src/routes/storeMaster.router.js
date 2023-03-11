"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StoreMaster_controller_1 = require("../controllers/StoreMaster.controller");
const router = express_1.default.Router();
router.get("/", StoreMaster_controller_1.getAllStoreMasters);
router.get("/:StoreGUID", StoreMaster_controller_1.getStoreMasterById);
router.post("/", StoreMaster_controller_1.createStoreMaster);
router.put("/:StoreGUID", StoreMaster_controller_1.updateStoreMaster);
router.delete("/:StoreGUID", StoreMaster_controller_1.deleteStoreMaster);
exports.default = router;
