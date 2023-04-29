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
exports.createAttribute = exports.deleteProductMaster = exports.updateProductMaster = exports.createProductMaster = exports.getAllProductMasters = void 0;
const config_1 = require("../../../config");
const ProductMaster_model_1 = __importDefault(require("../../models/product/ProductMaster.model"));
const decodeJWT_1 = __importDefault(require("../../utils/decodeJWT"));
const node_path_1 = __importDefault(require("node:path"));
const database_1 = require("../../database");
const ProductVariant_model_1 = require("../../models/product/ProductVariant.model");
const ProductAndCategoryMap_model_1 = __importDefault(require("../../models/product/ProductAndCategoryMap.model"));
const ProductCategory_model_1 = __importDefault(require("../../models/product/ProductCategory.model"));
const getAllProductMasters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const include = [
        {
            model: ProductAndCategoryMap_model_1.default,
            attributes: ["ProductCategoryRefGUID"],
            nested: true,
            as: "categories",
            include: [
                {
                    model: ProductCategory_model_1.default,
                    attributes: ["Name"],
                    as: "ProductCategory",
                },
            ],
        },
    ];
    try {
        var products = yield ProductMaster_model_1.default.findAll({
            include: [
                {
                    model: ProductAndCategoryMap_model_1.default,
                    attributes: ["ProductCategoryRefGUID"],
                    isMultiAssociation: true,
                    include: [
                        {
                            model: ProductCategory_model_1.default,
                            attributes: ["ProductCategoryName"],
                            as: "ProductCategory",
                        },
                    ],
                },
            ],
        });
        products.forEach((product) => {
            const images = [];
            for (let i = 1; i <= 4; i++) {
                const imageKey = `GalleryPhotoPath${i}`;
                const imagePath = product[imageKey];
                if (imagePath) {
                    images.push(node_path_1.default.join(__dirname, "public", imagePath));
                }
            }
            product.categories.forEach((c) => {
                c.setDataValue("Name", c.ProductCategory.ProductCategoryName);
                c.setDataValue("ProductCategory", undefined);
                c.setDataValue("ProductCategoryRefGUID", undefined);
            });
            product.setDataValue("GalleryPhotoPath1", undefined);
            product.setDataValue("GalleryPhotoPath2", undefined);
            product.setDataValue("GalleryPhotoPath3", undefined);
            product.setDataValue("GalleryPhotoPath4", undefined);
            product.setDataValue("images", images);
        });
        res.status(200).send({
            message: "Product masters fetched successfully!",
            products,
        });
    }
    catch (error) {
        console.log("---error", error.message);
        res.status(500).json(error);
    }
});
exports.getAllProductMasters = getAllProductMasters;
// export const getProductMasterById = async (req: Request, res: Response) => {
//   const { ProductMasterGUID } = req.params;
//   try {
//     const productMaster = await ProductMaster.findByPk(ProductMasterGUID, {
//       attributes: {
//         exclude: [
//           "CreatedGUID",
//           "CreatedDate",
//           "ModifiedGUID",
//           "UpdatedDate",
//           "DeletedGUID",
//           "DeletedDate",
//         ],
//       },
//       mapToModel: true,
//       nest: true,
//       include: [
//         {
//           model: ProductVariant,
//           attributes: [
//             "Unit_Price",
//             "MRP",
//             "GST",
//             "Qty",
//             "UnitsInStock",
//             "IsActive",
//             "SKU",
//             "UOM",
//             "Weight",
//             "SaleRate",
//             "Size",
//             "Color",
//             "Flavour",
//             "Featured",
//             [
//               Sequelize.literal(
//                 `CONCAT('{ "width": "', "Width", '", "height": "', "Height", '", "length": "', "Length", '" }')`
//               ),
//               "dimensions",
//             ],
//           ],
//         },
//       ],
//     });
//     // return 404 if product master not found
//     if (!productMaster) {
//       return res.status(400).json({
//         message: "Product master not found!",
//       });
//     }
//     // omit the gallery photo paths and explicit Width, Height, Length from the Variant object
//     const product = {
//       ...productMaster.toJSON(),
//       Images: productMaster.images,
//       GalleryPhotoPath1: undefined,
//       GalleryPhotoPath2: undefined,
//       GalleryPhotoPath3: undefined,
//       GalleryPhotoPath4: undefined,
//       Variants: productMaster.Variants.map((v) => ({
//         ...v.toJSON(),
//         Width: undefined,
//         Height: undefined,
//         Length: undefined,
//       })),
//     };
//     // send the response
//     res.send({
//       message: "Product master fetched successfully!",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
const createProductMaster = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.ProductType) {
        res.status(400).json({
            message: "Product type is required!",
        });
    }
    else if (req.body.ProductType.toString().toLocaleUpperCase() === "SIMPLE" &&
        req.body.variants.length > 1) {
        res.status(400).json({
            message: "Product type is simple, More than one variant not allowed!",
        });
    }
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    console.log("req.body", req.body);
    const { ProductName, ProductCode, ProductType, PhotoPath, GalleryPhotoPath1, GalleryPhotoPath2, GalleryPhotoPath3, GalleryPhotoPath4, variants, } = req.body;
    let t = undefined;
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
        t = yield database_1.sequelize.transaction();
        if (req.body.ProductType.toString().toLocaleUpperCase() === "SIMPLE") {
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
            if (Array.isArray(req.body.ProductCategoryRefGUID)) {
                let objects = req.body.ProductCategoryRefGUID.map((category) => ({
                    ProductCategoryRefGUID: +category,
                    ProductRefGUID: product.ProductGUID,
                }));
                console.log("objects", objects);
                yield ProductAndCategoryMap_model_1.default.bulkCreate(objects, {
                    transaction: t,
                });
            }
            else if (req.body.ProductCategoryRefGUID &&
                !isNaN(req.body.ProductCategoryRefGUID)) {
                yield ProductAndCategoryMap_model_1.default.create({
                    ProductCategoryRefGUID: req.body.ProductCategoryRefGUID,
                    ProductRefGUID: product.ProductGUID,
                }, {
                    transaction: t,
                });
            }
            else {
                yield ProductAndCategoryMap_model_1.default.create({
                    ProductCategoryRefGUID: 1,
                    ProductRefGUID: product.ProductGUID,
                }, {
                    transaction: t,
                });
            }
            yield t.commit();
            res.status(201).json({
                message: "Product master created successfully!",
                product: Object.assign(Object.assign({}, product.toJSON()), { variants: createdVariants }),
            });
        }
        else if (req.body.ProductType.toString().toLocaleUpperCase() === "VARIABLE") {
            variants.forEach((variant) => {
                // check if the variant has a Size or Color or Flavour otherwise throw error
                if (!variant.Size && !variant.Color && !variant.Flavour) {
                    throw new Error("Size or Color or Flavour is required for each variant!");
                }
            });
            const product = yield ProductMaster_model_1.default.create(req.body);
            const objects = [];
            if (Array.isArray(req.body.ProductCategoryRefGUID)) {
                let objs = req.body.ProductCategoryRefGUID.map((category) => ({
                    ProductCategoryRefGUID: +category,
                    ProductRefGUID: product.ProductGUID,
                }));
                console.log("objects", objs);
                objects.push(...objs);
            }
            else if (req.body.ProductCategoryRefGUID &&
                !isNaN(req.body.ProductCategoryRefGUID)) {
                objects.push({
                    ProductCategoryRefGUID: req.body.ProductCategoryRefGUID,
                    ProductRefGUID: product.ProductGUID,
                });
            }
            else {
                objects.push({
                    ProductCategoryRefGUID: 1,
                    ProductRefGUID: product.ProductGUID,
                });
            }
            yield ProductAndCategoryMap_model_1.default.bulkCreate(objects, {
                transaction: t,
            });
            let createdVariants = yield ProductVariant_model_1.ProductVariant.bulkCreate(variants.map((variant) => (Object.assign(Object.assign({}, variant), { ProductMasterRefGUID: product.ProductGUID, CreatedGUID: req.body.CreatedGUID }))), {
                transaction: t,
            });
            yield t.commit().catch((error) => {
                console.error("Error occurred while committing transaction:", error);
                t === null || t === void 0 ? void 0 : t.rollback();
            });
            res.status(201).json({
                message: "Product master created successfully!",
                product: Object.assign(Object.assign({}, product.toJSON()), { variants: createdVariants }),
            });
        }
    }
    catch (error) {
        next(error);
    }
    finally {
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
