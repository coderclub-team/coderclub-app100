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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IProductMeta = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let IProductMeta = class IProductMeta extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "ProductMetaGUID",
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "ProductMetaGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "ProductRefGUID",
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "ProductRefGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "ProductVariantRefGUID",
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "ProductVariantRefGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        field: "SKU",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "SKU", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "Visibility",
        defaultValue: "VISIBLE",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "Visibility", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: true,
        field: "Weight",
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "Weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: true,
        field: "Length",
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "Length", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: true,
        field: "Width",
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "Width", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: true,
        field: "Height",
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "Height", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(3),
        allowNull: false,
        field: "IsFeatured",
        defaultValue: "NO",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "IsFeatured", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "ImagePath",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "ImagePath", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "GalleryImagePath1",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "GalleryImagePath1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "GalleryImagePath2",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "GalleryImagePath2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "GalleryImagePath3",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "GalleryImagePath3", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "GalleryImagePath4",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "GalleryImagePath4", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "GalleryImagePath5",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "RegularPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
        field: "GalleryImagePath6",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "SalePrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "StockStatus",
        defaultValue: "In Stock",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "StockStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "UnitsInStock",
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "UnitsInStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "ratingCount",
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "ratingCount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "AverageRating",
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "AverageRating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "TaxStatus",
        defaultValue: "None",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "TaxStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "TaxClass",
        defaultValue: "None",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "TaxClass", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
        field: "TaxInPercentage",
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "TaxInPercentage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
        field: "TaxInAmount",
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], IProductMeta.prototype, "TaxInAmount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(3),
        allowNull: false,
        field: "OnSale",
        defaultValue: "NO",
    }),
    __metadata("design:type", String)
], IProductMeta.prototype, "OnSale", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: "CreatedDate",
        defaultValue: new Date(),
    }),
    __metadata("design:type", Date)
], IProductMeta.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "ModifiedDate",
    }),
    __metadata("design:type", Date)
], IProductMeta.prototype, "ModifiedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "DeletedDate",
    }),
    __metadata("design:type", Date)
], IProductMeta.prototype, "DeletedDate", void 0);
IProductMeta = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_IProductMeta",
        timestamps: true,
        paranoid: true,
        createdAt: "CreatedDate",
        updatedAt: "ModifiedDate",
        deletedAt: "DeletedDate",
    })
], IProductMeta);
exports.IProductMeta = IProductMeta;
