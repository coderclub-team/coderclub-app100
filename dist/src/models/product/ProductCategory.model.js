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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ProductCategory_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// Path: src/models/ProductCategory.ts
let ProductCategory = ProductCategory_1 = class ProductCategory extends sequelize_typescript_1.Model {
    // check if the category name already exists before create
    static checkIfCategoryExists(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield ProductCategory_1.count({
                where: {
                    ProductCategoryName: instance.ProductCategoryName,
                    ParentCategoryRefGUID: null,
                },
            });
            if (count) {
                throw new Error("Category already exists");
            }
        });
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "ProductCategoryGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductCategory.prototype, "ProductCategoryName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ProductCategory_1),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "ParentCategoryRefGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "IsActive", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductCategory]),
    __metadata("design:returntype", Promise)
], ProductCategory, "checkIfCategoryExists", null);
ProductCategory = ProductCategory_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductCategory",
        paranoid: false,
        timestamps: false,
    })
], ProductCategory);
exports.default = ProductCategory;
