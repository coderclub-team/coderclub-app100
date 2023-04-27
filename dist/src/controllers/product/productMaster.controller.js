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
exports.createAttribute = exports.deleteProductMaster = exports.updateProductMaster = exports.createProductMaster = exports.getProductMasterById = exports.getAllProductMasters = void 0;
const config_1 = require("../../../config");
const ProductMaster_model_1 = __importDefault(require("../../models/product/ProductMaster.model"));
const decodeJWT_1 = __importDefault(require("../../utils/decodeJWT"));
const node_path_1 = __importDefault(require("node:path"));
const database_1 = require("../../database");
const ProductVariant_model_1 = require("../../models/product/ProductVariant.model");
const getAllProductMasters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productMasters = yield ProductMaster_model_1.default.findAll({
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
            nest: true,
            include: [
                {
                    model: ProductVariant_model_1.ProductVariant,
                    attributes: {
                        exclude: ["CreatedGUID", "CreatedDate"],
                    },
                },
            ],
        });
        res.status(200).json({
            message: "Product masters fetched successfully!",
            productMasters,
        });
    }
    catch (error) {
        console.log("---error", error.message);
        res.status(500).json(error);
    }
});
exports.getAllProductMasters = getAllProductMasters;
const getProductMasterById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductMasterGUID } = req.params;
    try {
        const productMaster = yield ProductMaster_model_1.default.findByPk(ProductMasterGUID, {
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
            nest: true,
            include: [
                {
                    model: ProductVariant_model_1.ProductVariant,
                    attributes: {
                        exclude: ["CreatedGUID", "CreatedDate"],
                    },
                },
            ],
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
        res.status(500).json(error);
    }
});
exports.getProductMasterById = getProductMasterById;
const createProductMaster = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.ProductType) {
        res.status(400).json({
            message: "Product type is required!",
        });
    }
    if (req.body.ProductType.toString().toLocaleUpperCase() === "SIMPLE") {
        if (req.body.user) {
            req.body.CreatedGUID = req.body.user.UserGUID;
        }
        else {
            req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
        }
        const t = yield database_1.sequelize.transaction();
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                console.log("No files were uploaded.");
            }
            else {
                Object.entries(req.files).forEach(([key, value]) => {
                    console.log(key, value);
                    req.body[key] = node_path_1.default.join(config_1.productImageUploadOptions.directory, value[0].filename);
                });
            }
            console.log("req.body", req.body);
            const { ProductName, ProductCode, ProductType, PhotoPath, GalleryPhotoPath1, GalleryPhotoPath2, GalleryPhotoPath3, GalleryPhotoPath4, variants, } = req.body;
            const product = yield ProductMaster_model_1.default.create({
                ProductName,
                ProductCode,
                ProductType,
                PhotoPath,
                GalleryPhotoPath1,
                GalleryPhotoPath2,
                GalleryPhotoPath3,
                GalleryPhotoPath4,
                CreatedGUID: req.body.CreatedGUID,
            }, {
                transaction: t,
            });
            let createdVariants = yield ProductVariant_model_1.ProductVariant.bulkCreate(variants.map((variant) => (Object.assign(Object.assign({}, variant), { ProductMasterRefGUID: product.ProductGUID, CreatedGUID: req.body.CreatedGUID }))), {
                transaction: t,
            });
            yield t
                .commit()
                .then(() => {
                console.log("Transaction committed");
                res.status(201).json({
                    message: "Product master created successfully!",
                    product: Object.assign(Object.assign({}, product.toJSON()), { variants: createdVariants }),
                });
            })
                .catch((error) => {
                t.rollback();
                console.log("error===>", error);
                next(error);
            });
        }
        catch (error) {
            t.rollback();
            console.log("error===>", error);
            next(error);
        }
    }
    else if (req.body.ProductType.toString().toLocaleUpperCase() === "VARIABLE") {
        console.log("req.body", req.body);
        try {
            const product = yield ProductMaster_model_1.default.create(req.body);
            res.status(201).json({
                message: "Product master created successfully!",
                product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    else {
        res.status(400).json({
            message: "Product type is required!",
        });
    }
    // try {
    //   console.log("req.file.filename", req!.file);
    //   if (req.file) {
    //     const { filename, path: tmpPath } = req.file;
    //     req.body.tmpPath = tmpPath;
    //     req.body.uploadPath = path.join(
    //       productImageUploadOptions.relativePath,
    //       filename
    //     );
    //     req.body.PhotoPath = path.join(
    //       productImageUploadOptions.directory,
    //       filename
    //     );
    //   }
    //   const ceratedPhoto = await ProductMaster.create(req.body);
    //   if (req.body.tmpPath && req.body.uploadPath) {
    //     fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
    //       if (err) console.log(err);
    //       else
    //         ceratedPhoto!.PhotoPath = path.join(
    //           req.protocol + "://" + req.get("host"),
    //           ceratedPhoto!.PhotoPath
    //         );
    //     });
    //   }
    //   res.status(201).json({
    //     message: "Product master created successfully!",
    //   });
    // } catch (error) {
    //   next(error);
    // }
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
        const productMaster = yield ProductMaster_model_1.default.findByPk(ProductMasterGUID);
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
        res.status(500).json(error);
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
                message: "Product master not found!!",
            });
        }
        yield ProductMaster_model_1.default.destroy({
            where: {
                ProductMasterGUID,
            },
        });
        res.send({
            message: "Product master deleted successfully!",
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteProductMaster = deleteProductMaster;
const createAttribute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get productGUID from params
    const { productGUID } = req.params;
    try {
        res.status(201).json({
            message: "Attribute created successfully!",
            // attribute
            // ProductMasterGUID: productGUID,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createAttribute = createAttribute;
