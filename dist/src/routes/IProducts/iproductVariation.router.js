"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// a route for products
const express_1 = __importDefault(require("express"));
const IProductVariation_controller_1 = require("../../controllers/IProducts/IProductVariation.controller");
const router = express_1.default.Router();
exports.default = router;
router.get("/", IProductVariation_controller_1.getAllIProductVariations);
router.get(
  "/:IProductVariationGUID",
  IProductVariation_controller_1.getIProductVariationById
);
