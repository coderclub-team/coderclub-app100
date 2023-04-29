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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ProductCategory_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const ProductAndCategoryMap_model_1 = __importDefault(require("./ProductAndCategoryMap.model"));
const ProductMaster_model_1 = __importDefault(require("./ProductMaster.model"));
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
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "ProductCategoryGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(400),
        allowNull: false,
        field: "ProductCategoryName",
    }),
    __metadata("design:type", String)
], ProductCategory.prototype, "ProductCategoryName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ProductCategory_1),
    (0, sequelize_typescript_1.BelongsTo)(() => ProductCategory_1, {
        foreignKey: "ParentCategoryRefGUID",
        targetKey: "ProductCategoryGUID",
        as: "ParentCategory",
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "ParentCategoryRefGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "IsActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(400),
        allowNull: false,
        field: "ProductCategorySlug",
    }),
    __metadata("design:type", String)
], ProductCategory.prototype, "ProductCategorySlug", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "MenuOrder", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductCategory.prototype, "PhotoPath", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        get: function () {
            return __awaiter(this, void 0, void 0, function* () {
                const count = yield ProductAndCategoryMap_model_1.default.count({
                    where: {
                        ProductCategoryRefGUID: this.ProductCategoryGUID,
                    },
                });
                return count;
            });
        },
    }),
    __metadata("design:type", Number)
], ProductCategory.prototype, "NoOfProducts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => ProductMaster_model_1.default, () => ProductAndCategoryMap_model_1.default, "ProductCategoryRefGUID", "ProductRefGUID"),
    __metadata("design:type", Array)
], ProductCategory.prototype, "products", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductCategory]),
    __metadata("design:returntype", Promise)
], ProductCategory, "checkIfCategoryExists", null);
__decorate([
    sequelize_typescript_1.BeforeBulkCreate,
    sequelize_typescript_1.BeforeBulkUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProductCategory, "beforeBulkCreateHook", null);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductCategory]),
    __metadata("design:returntype", void 0)
], ProductCategory, "beforeCreateHook", null);
ProductCategory = ProductCategory_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductCategory",
        paranoid: false,
        timestamps: false,
    })
], ProductCategory);
exports.default = ProductCategory;
