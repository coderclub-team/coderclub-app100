"use strict";
// a controller for product
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCategory = exports.createProductCategory = exports.getProductCategoryById = exports.getAllProductCategories = void 0;
const ProductCategory_model_1 = __importDefault(require("../../models/product/ProductCategory.model"));
// import { productCategoryImageUploadOptions } from "../../config";
const getAllProductCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield ProductCategory_model_1.default.findAll({});
        categories.forEach((category) => __awaiter(void 0, void 0, void 0, function* () {
            category.setFullURL(req, "PhotoPath");
        }));
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllProductCategories = getAllProductCategories;
const getProductCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductCategoryGUID } = req.params;
    try {
        const category = yield ProductCategory_model_1.default.findByPk(ProductCategoryGUID);
        category === null || category === void 0 ? void 0 : category.setFullURL(req, "PhotoPath");
        if (!category) {
            return res.status(400).json({
                message: "Product category not found!",
            });
        }
        res.send({
            message: "Product category fetched successfully!",
            category,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getProductCategoryById = getProductCategoryById;
const createProductCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.CreatedGUID = req.body.user.UserGUID;
    try {
        const productCategory = yield ProductCategory_model_1.default.create(req.body);
        res.send({
            message: "Product category created successfully!",
            productCategory,
        });
    }
    catch (error) {
        console.log("productCategory.controller", error.message);
        next(error);
    }
});
exports.createProductCategory = createProductCategory;
const deleteProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductCategoryGUID } = req.params;
    try {
        const productCategory = yield ProductCategory_model_1.default.findByPk(ProductCategoryGUID);
        if (!productCategory) {
            return res.status(400).json({
                message: "Product category not found!",
            });
        }
        yield productCategory.destroy();
        res.send({
            message: "Product category deleted successfully!",
            productCategory,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteProductCategory = deleteProductCategory;
// Path: src/routes/productCategoryRoute.ts
