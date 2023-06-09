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
exports.deleteProductCategory = exports.updateProductCategory = exports.createProductCategory = exports.getProductCategoryById = exports.getAllProductCategories = void 0;
const ProductCategory_model_1 = __importDefault(require("../../models/product/ProductCategory.model"));
const decodeJWT_1 = __importDefault(require("../../utils/decodeJWT"));
const ProductSubCategory_model_1 = __importDefault(require("../../models/product/ProductSubCategory.model"));
// import { productCategoryImageUploadOptions } from "../../config";
const getAllProductCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productCategories = yield ProductCategory_model_1.default.findAll({
            attributes: {
                exclude: ["CreatedGUID", "CreatedDate"],
            },
            paranoid: false,
            include: {
                model: ProductSubCategory_model_1.default,
                attributes: ["ProductSubCategoryName"],
            },
        });
        res.status(200).json({
            message: "Product categories fetched successfully!",
            productCategories,
            total: productCategories.length,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.getAllProductCategories = getAllProductCategories;
const getProductCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductCategoryGUID } = req.params;
    try {
        const productCategory = yield ProductCategory_model_1.default.findByPk(ProductCategoryGUID, {
            attributes: {
                exclude: ["CreatedGUID", "CreatedDate"],
            },
        });
        if (!productCategory) {
            return res.status(400).json({
                message: "Product category not found!",
            });
        }
        res.send({
            message: "Product category fetched successfully!",
            productCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.getProductCategoryById = getProductCategoryById;
const createProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user.UserGUID) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    try {
        const productCategory = yield ProductCategory_model_1.default.create(req.body);
        res.send({
            message: "Product category created successfully!",
            productCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.createProductCategory = createProductCategory;
const updateProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add modifiedGUID using req.body.user.UserGUID or decodeJWT(req)
    if (req.body.user.UserGUID) {
        req.body.ModifiedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.ModifiedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const { ProductCategoryGUID } = req.params;
    try {
        const productCategory = yield ProductCategory_model_1.default.findByPk(ProductCategoryGUID);
        if (!productCategory) {
            return res.status(400).json({
                message: "Product category not found!",
            });
        }
        yield productCategory.update(req.body, {
            exclude: ["CreatedGUID", "CreatedDate", "ProductCategoryGUID"],
        });
        res.send({
            message: "Product category updated successfully!",
            productCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.updateProductCategory = updateProductCategory;
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
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.deleteProductCategory = deleteProductCategory;
// Path: src/routes/productCategoryRoute.ts
