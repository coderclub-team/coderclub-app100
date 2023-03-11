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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSubCategory = exports.updateProductSubCategory = exports.createProductSubCategory = exports.getProductSubCategoryById = exports.getAllProductSubCategories = void 0;
const ProductSubCategory_model_1 = __importDefault(require("../../models/product/ProductSubCategory.model"));
const decodeJWT_1 = __importDefault(require("../../utils/decodeJWT"));
const ProductCategory_model_1 = __importDefault(require("../../models/product/ProductCategory.model"));
const getAllProductSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productSubCategories = yield ProductSubCategory_model_1.default.findAll({
            attributes: {
                exclude: ["CreatedGUID", "CreatedDate"],
            },
            // ProductCategory refe
            include: {
                model: ProductCategory_model_1.default,
                attributes: ["ProductCategoryName"],
            },
        });
        res.status(200).json({
            message: "Product sub categories fetched successfully!",
            productSubCategories,
            total: productSubCategories.length,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.getAllProductSubCategories = getAllProductSubCategories;
const getProductSubCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductSubCategoryGUID } = req.params;
    try {
        const productSubCategory = yield ProductSubCategory_model_1.default.findByPk(ProductSubCategoryGUID, {
            attributes: {
                exclude: ["CreatedGUID", "CreatedDate"],
            },
            include: {
                model: ProductCategory_model_1.default,
                attributes: ["ProductCategoryName"],
            },
        });
        if (!productSubCategory) {
            return res.status(400).json({
                message: "Product sub category not found!",
            });
        }
        res.send({
            message: "Product sub category fetched successfully!",
            productSubCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.getProductSubCategoryById = getProductSubCategoryById;
const createProductSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add createdGUID using req.body.user.UserGUID or decodeJWT(req)
    if (req.body.user.UserGUID) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const { ProductCategoryGUID, ProductSubCategoryName } = req.body;
    try {
        const productSubCategory = yield ProductSubCategory_model_1.default.create({
            ProductCategoryGUID,
            ProductSubCategoryName,
        });
        res.status(201).json({
            message: "Product sub category created successfully!",
            productSubCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.createProductSubCategory = createProductSubCategory;
const updateProductSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add modifiedGUID using req.body.user.UserGUID or decodeJWT(req)
    if (req.body.user.UserGUID) {
        req.body.ModifiedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.ModifiedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const { ProductSubCategoryGUID } = req.params;
    try {
        const productSubCategory = yield ProductSubCategory_model_1.default.findByPk(ProductSubCategoryGUID);
        if (!productSubCategory) {
            return res.status(400).json({
                message: "Product sub category not found!",
            });
        }
        productSubCategory.update(req.body, {
            exclude: ["CreatedGUID", "CreatedDate", "ProductSubCategoryGUID"],
        });
        res.status(200).json({
            message: "Product sub category updated successfully!",
            productSubCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.updateProductSubCategory = updateProductSubCategory;
const deleteProductSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductSubCategoryGUID } = req.params;
    try {
        const productSubCategory = yield ProductSubCategory_model_1.default.findByPk(ProductSubCategoryGUID);
        if (!productSubCategory) {
            return res.status(400).json({
                message: "Product sub category not found!",
            });
        }
        productSubCategory.destroy();
        res.status(200).json({
            message: "Product sub category deleted successfully!",
            productSubCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.deleteProductSubCategory = deleteProductSubCategory;
