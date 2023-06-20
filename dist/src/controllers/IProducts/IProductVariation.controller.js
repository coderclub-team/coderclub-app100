"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIProductVariationById = exports.getAllIProductVariations = void 0;
const IProductVariation_model_1 = require("../../models/IProduct/IProductVariation.model");
const getAllIProductVariations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const variations = yield IProductVariation_model_1.IProductVariation.findAll();
        res.send({
            message: "Product variations fetched successfully!",
            variations,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllIProductVariations = getAllIProductVariations;
const getIProductVariationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { IProductGUID } = req.params;
    try {
        const variation = yield IProductVariation_model_1.IProductVariation.findByPk(IProductGUID);
        if (!variation) {
            return res.status(400).json({
                message: "Product variation not found!",
            });
        }
        res.send({
            message: "Product variation fetched successfully!",
            variation,
        });
    }
    catch (error) {
        console.log("iproduct.controller", error.message);
        res.status(500).json(error);
    }
});
exports.getIProductVariationById = getIProductVariationById;
