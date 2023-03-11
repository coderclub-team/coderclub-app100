"use strict";
// [ProductCategoryGUID] [int] IDENTITY(1,1) NOT NULL,
// 	[ProductCategoryName] [varchar](400) NULL,
// 	[IsActive] [bit] NULL,
// 	[CreatedGUID] [int] NULL,
// 	[CreatedDate] [datetime] NULL
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
exports.ProductCategory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
// Path: src/models/ProductCategory.ts
class ProductCategory extends sequelize_typescript_1.Model {
}
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "ProductCategoryGUID",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], ProductCategory.prototype, "ProductCategoryGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "ProductCategoryName",
        allowNull: false,
        type: sequelize_typescript_1.DataType.STRING(100),
        comment: "Product Category Name",
        unique: true,
    }),
    __metadata("design:type", String)
], ProductCategory.prototype, "ProductCategoryName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "IsActive",
        allowNull: false,
        type: sequelize_typescript_1.DataType.TINYINT,
        comment: "Is Active",
        defaultValue: 1,
    }),
    __metadata("design:type", Boolean)
], ProductCategory.prototype, "IsActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "CreatedGUID",
        allowNull: false,
        type: sequelize_typescript_1.DataType.INTEGER,
        comment: "Created GUID",
        references: {
            model: "User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", Number)
], ProductCategory.prototype, "CreatedGUID", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: "CreatedDate",
        allowNull: false,
        type: sequelize_typescript_1.DataType.DATEONLY,
        comment: "Created Date",
    }),
    __metadata("design:type", Date)
], ProductCategory.prototype, "CreatedDate", void 0);
exports.ProductCategory = ProductCategory;
