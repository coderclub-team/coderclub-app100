"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const sequelize_typescript_1 = require("sequelize-typescript");
const ProductAndCategoryMap_model_1 = __importDefault(require("./ProductAndCategoryMap.model"));
let ProductMaster = class ProductMaster extends sequelize_typescript_1.Model {
    static generateProductGUID(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextGUID = ((yield this.max("ProductGUID")) || 0) + 1;
            // const productCategory = await ProductCategory.findByPk(
            //   instance.ProductCategoryGUID
            // );
            // const productSubCategory = await ProductSubCategory.findByPk(
            //   instance.ProductSubCategoryGUID
            // );
            // if (!productCategory || !productSubCategory)
            //   return (instance.ProductID =
            //     "ABC-XYZ-" + nextGUID.toString().padStart(4, "0"));
            // const PRO = productCategory?.ProductCategoryName.substring(
            //   0,
            //   3
            // )?.toUpperCase();
            // const SUB = productSubCategory?.ProductSubCategoryName.substring(
            //   0,
            //   3
            // )?.toUpperCase();
            // instance.ProductID =
            //   PRO + "-" + SUB + "-" + nextGUID.toString().padStart(4, "0");
            instance.ProductID =
                "CAT" + "-" + "SUB" + "-" + nextGUID.toString().padStart(4, "0");
            instance.ProductCode = instance.ProductID;
        });
    }
    // Getter method to return an array of image URLs
    get images() {
        const images = [
            this.getDataValue("GalleryPhotoPath1"),
            this.getDataValue("GalleryPhotoPath2"),
            this.getDataValue("GalleryPhotoPath3"),
            this.getDataValue("GalleryPhotoPath4"),
        ];
        // Remove any null or undefined values
        return images.filter((image) => image);
    }
    static beforeBulkCreateHook(instances) {
        instances.forEach((instance) => {
            Object.entries(instance.toJSON()).forEach(([key, value]) => {
                if (typeof value === "string") {
                    instance.setDataValue(key, value.trim());
                }
            });
        });
    }
    static beforeCreateHook(instance) {
        Object.entries(instance.toJSON()).forEach(([key, value]) => {
            if (typeof value === "string") {
                instance.setDataValue(key, value.trim());
            }
        });
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "ProductGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
        field: "Unit_Price",
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "MRP", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "GST", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "Qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitsInStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TINYINT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "IsActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true,
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "SKU", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "GalleryPhotoPath1", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "GalleryPhotoPath2", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "GalleryPhotoPath3", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "GalleryPhotoPath4", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ProductAndCategoryMap_model_1.default, "ProductrefGUID"),
    __metadata("design:type", Array)
], ProductMaster.prototype, "categories", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductMaster]),
    __metadata("design:returntype", Promise)
], ProductMaster, "generateProductGUID", null);
__decorate([
    sequelize_typescript_1.BeforeBulkCreate,
    sequelize_typescript_1.BeforeBulkUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProductMaster, "beforeBulkCreateHook", null);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductMaster]),
    __metadata("design:returntype", void 0)
], ProductMaster, "beforeCreateHook", null);
ProductMaster = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductMaster",
        timestamps: true,
        paranoid: false,
        createdAt: "CreatedDate",
        // updatedAt: "ModifiedDate",
        // deletedAt: "DeletedDate",
    })
], ProductMaster);
exports.default = ProductMaster;
