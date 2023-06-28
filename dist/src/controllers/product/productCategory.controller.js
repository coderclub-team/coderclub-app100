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
const decodeJWT_1 = __importDefault(require("../../utils/decodeJWT"));
const node_path_1 = __importDefault(require("node:path"));
const ProductCategory_model_1 = __importDefault(require("../../models/product/ProductCategory.model"));
// import { productCategoryImageUploadOptions } from "../../config";
const getAllProductCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield ProductCategory_model_1.default.findAll({});
        categories.forEach((category) => __awaiter(void 0, void 0, void 0, function* () {
            const imageKey = "PhotoPath";
            const imagePath = category[imageKey];
            if (!imagePath)
                return;
            const host = req.protocol + "://" + req.get("host");
            const imageFullPath = new URL(node_path_1.default.join(host, imagePath)).toString();
            category.setDataValue("PhotoPath", imageFullPath);
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
        const imageKey = "PhotoPath";
        const imagePath = category === null || category === void 0 ? void 0 : category[imageKey];
        if (!imagePath)
            return;
        const host = req.protocol + "://" + req.get("host");
        const imageFullPath = new URL(node_path_1.default.join(host, imagePath)).toString();
        category.setDataValue("PhotoPath", imageFullPath);
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
    if (req.body.user) {
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
        console.log("productCategory.controller", error.message);
        next(error);
    }
});
exports.createProductCategory = createProductCategory;
// export const updateProductCategory = async (req: Request, res: Response) => {
//   if (req.body.user.UserGUID) {
//     req.body.ModifiedGUID = req.body.user.UserGUID;
//   } else {
//     req.body.ModifiedGUID = decodeJWT(req).UserGUID;
//   }
//   const { ProductCategoryGUID } = req.params;
//   try {
//     const productCategory = await ProductCategory.findByPk(ProductCategoryGUID);
//     if (!productCategory) {
//       return res.status(400).json({
//         message: "Product category not found!",
//       });
//     }
//     await productCategory.update(req.body, {
//       exclude: ["CreatedGUID", "CreatedDate", "ProductCategoryGUID"],
//     });
//     res.send({
//       message: "Product category updated successfully!",
//       productCategory,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
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
