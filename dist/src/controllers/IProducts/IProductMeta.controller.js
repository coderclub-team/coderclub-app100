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
exports.getIProductAttributeById = exports.getAllIProductAttributes = void 0;
const IProduct_model_1 = require("../../models/IProduct/IProduct.model");
const IProductVariation_model_1 = require("../../models/IProduct/IProductVariation.model");
const getAllIProductAttributes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const iproducts = yield IProduct_model_1.IProduct.findAll();
        res.send({
            message: "IProducts fetched successfully!",
            iproducts,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllIProductAttributes = getAllIProductAttributes;
const getIProductAttributeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { IProductGUID } = req.params;
    try {
        const iproduct = yield IProductVariation_model_1.IProductVariation.findByPk(IProductGUID);
        if (!iproduct) {
            return res.status(400).json({
                message: "IProduct not found!",
            });
        }
        res.send({
            message: "IProduct fetched successfully!",
            iproduct,
        });
    }
    catch (error) {
        console.log("iproduct.controller", error.message);
        res.status(500).json(error);
    }
});
exports.getIProductAttributeById = getIProductAttributeById;
