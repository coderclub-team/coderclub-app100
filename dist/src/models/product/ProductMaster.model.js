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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const ProductCategory_model_1 = __importDefault(require("./ProductCategory.model"));
const ProductSubCategory_model_1 = __importDefault(require("./ProductSubCategory.model"));
let ProductMaster = class ProductMaster extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        comment: "ProductGUID",
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "ProductGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(200),
        unique: true,
        comment: "ProductID",
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(100),
        comment: "ProductName",
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(200),
        comment: "ProductCode",
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductCode", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ProductCategory_model_1.default, {
        foreignKey: "ProductCategoryGUID",
        targetKey: "ProductCategoryGUID",
        as: "ProductCategory",
    }),
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        comment: "ProductCategoryGUID",
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "ProductCategoryGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ProductSubCategory_model_1.default, {
        foreignKey: "ProductSubCategoryGUID",
        targetKey: "ProductSubCategoryGUID",
        as: "ProductSubCategory",
    }),
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        comment: "ProductSubCategoryGUID",
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "ProductSubCategoryGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.DECIMAL(10, 3),
        comment: "Unit_Price",
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "Unit_Price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.DECIMAL(10, 3),
        comment: "MRP",
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "MRP", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(100),
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "GST", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "Qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitsInStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.TINYINT,
        comment: "",
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "IsActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(100),
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "SKU", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(100),
    }),
    __metadata("design:type", String)
], ProductMaster.prototype, "UOM", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "UOMTypeGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        comment: "CreatedDate",
    }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
        comment: "ModifiedDate",
    }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "ModifiedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
        comment: "DeletedDate",
    }),
    __metadata("design:type", Date)
], ProductMaster.prototype, "DeletedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        comment: "CreatedGUID",
        references: {
            model: "User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        comment: "ModifiedGUID",
        references: {
            model: "User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "ModifiedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
        comment: "DeletedGUID",
        references: {
            model: "User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "DeletedGUID", void 0);
ProductMaster = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductMaster",
        timestamps: true,
        paranoid: true,
        createdAt: "CreatedDate",
        updatedAt: "ModifiedDate",
        deletedAt: "DeletedDate",
    })
], ProductMaster);
exports.default = ProductMaster;
