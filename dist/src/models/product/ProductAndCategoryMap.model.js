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
const sequelize_typescript_1 = require("sequelize-typescript");
const ProductCategory_model_1 = __importDefault(require("./ProductCategory.model"));
const ProductMaster_model_1 = __importDefault(require("./ProductMaster.model"));
let ProductAndCategoryMap = class ProductAndCategoryMap extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductAndCategoryMap.prototype, "ProductAndCategoryMapGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ProductCategory_model_1.default, {
        foreignKey: "ProductCategoryRefGUID",
        targetKey: "ProductCategoryGUID",
        as: "ProductCategory",
    }),
    __metadata("design:type", Number)
], ProductAndCategoryMap.prototype, "ProductCategoryRefGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ProductMaster_model_1.default, {
        foreignKey: "ProductRefGUID",
        targetKey: "ProductGUID",
        as: "Product",
    }),
    __metadata("design:type", Number)
], ProductAndCategoryMap.prototype, "ProductRefGUID", void 0);
ProductAndCategoryMap = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductAndCategoryMap",
        paranoid: false,
        timestamps: false,
    })
], ProductAndCategoryMap);
exports.default = ProductAndCategoryMap;
