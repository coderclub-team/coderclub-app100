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
exports.deleteProductMaster = exports.updateProductMaster = exports.createProductMaster = exports.getProductMasterById = exports.getAllProductMasters = void 0;
const ProductCategory_model_1 = __importDefault(require("../../models/product/ProductCategory.model"));
const ProductMaster_model_1 = __importDefault(require("../../models/product/ProductMaster.model"));
const ProductSubCategory_model_1 = __importDefault(require("../../models/product/ProductSubCategory.model"));
const decodeJWT_1 = __importDefault(require("../../utils/decodeJWT"));
const getAllProductMasters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productMasters = yield ProductMaster_model_1.default.findAll({
            include: [
                {
                    model: ProductCategory_model_1.default,
                    attributes: {
                        exclude: [
                            "CreatedGUID",
                            "CreatedDate",
                            "ModifiedGUID",
                            "UpdatedDate",
                            "DeletedGUID",
                            "DeletedDate",
                        ],
                    },
                },
                {
                    model: ProductSubCategory_model_1.default,
                    attributes: {
                        exclude: [
                            "CreatedGUID",
                            "CreatedDate",
                            "ModifiedGUID",
                            "UpdatedDate",
                            "DeletedGUID",
                            "DeletedDate",
                        ],
                    },
                },
            ],
            attributes: {
                exclude: [
                    "CreatedGUID",
                    "CreatedDate",
                    "ModifiedGUID",
                    "UpdatedDate",
                    "DeletedGUID",
                    "DeletedDate",
                ],
            },
        });
        res.status(200).json({
            message: "Product masters fetched successfully!",
            productMasters,
        });
    }
    catch (error) {
        console.log("---error", error.message);
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.getAllProductMasters = getAllProductMasters;
const getProductMasterById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductMasterGUID } = req.params;
    try {
        const productMaster = yield ProductMaster_model_1.default.findByPk(ProductMasterGUID, {
            include: [
                {
                    model: ProductCategory_model_1.default,
                    attributes: {
                        exclude: [
                            "CreatedGUID",
                            "CreatedDate",
                            "ModifiedGUID",
                            "UpdatedDate",
                            "DeletedGUID",
                            "DeletedDate",
                        ],
                    },
                },
                {
                    model: ProductSubCategory_model_1.default,
                    attributes: {
                        exclude: [
                            "CreatedGUID",
                            "CreatedDate",
                            "ModifiedGUID",
                            "UpdatedDate",
                            "DeletedGUID",
                            "DeletedDate",
                        ],
                    },
                },
            ],
            attributes: {
                exclude: [
                    "CreatedGUID",
                    "CreatedDate",
                    "ModifiedGUID",
                    "UpdatedDate",
                    "DeletedGUID",
                    "DeletedDate",
                ],
            },
        });
        if (!productMaster) {
            return res.status(400).json({
                message: "Product master not found!",
            });
        }
        res.send({
            message: "Product master fetched successfully!",
            productMaster,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.getProductMasterById = getProductMasterById;
const createProductMaster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user.UserGUID) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    try {
        const productMaster = yield ProductMaster_model_1.default.create(req.body);
        res.status(201).json({
            message: "Product master created successfully!",
            productMaster,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.createProductMaster = createProductMaster;
const updateProductMaster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductMasterGUID } = req.params;
    if (req.body.user.UserGUID) {
        req.body.ModifiedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.ModifiedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    try {
        const productMaster = yield ProductMaster_model_1.default.findByPk(ProductMasterGUID, {
            include: [
                {
                    model: ProductCategory_model_1.default,
                    attributes: {
                        exclude: [
                            "CreatedGUID",
                            "CreatedDate",
                            "ModifiedGUID",
                            "UpdatedDate",
                            "DeletedGUID",
                            "DeletedDate",
                        ],
                    },
                },
                {
                    model: ProductSubCategory_model_1.default,
                    attributes: {
                        exclude: [
                            "CreatedGUID",
                            "CreatedDate",
                            "ModifiedGUID",
                            "UpdatedDate",
                            "DeletedGUID",
                            "DeletedDate",
                        ],
                    },
                },
            ],
        });
        if (!productMaster) {
            return res.status(400).json({
                message: "Product master not found!",
            });
        }
        yield productMaster.update(req.body);
        res.send({
            message: "Product master updated successfully!",
            productMaster,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.updateProductMaster = updateProductMaster;
const deleteProductMaster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user.UserGUID) {
        req.body.DeletedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.DeletedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const { ProductMasterGUID } = req.params;
    try {
        const productMaster = yield ProductMaster_model_1.default.findByPk(ProductMasterGUID);
        if (!productMaster) {
            return res.status(400).json({
                message: "Product master not found!",
            });
        }
        yield productMaster.destroy();
        res.send({
            message: "Product master deleted successfully!",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error,
        });
    }
});
exports.deleteProductMaster = deleteProductMaster;
