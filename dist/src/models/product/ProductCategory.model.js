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
const sequelize_typescript_1 = require("sequelize-typescript");
// Path: src/models/ProductCategory.ts
let ProductCategory = class ProductCategory extends sequelize_typescript_1.Model {
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
    setFullURL(request, key) {
        const hostname = request.protocol + "://" + request.get("host");
        const originalPath = this.getDataValue(key);
        if (!originalPath)
            return;
        const fullPath = `${hostname}/${this.getDataValue("PhotoPath")}`;
        this.setDataValue(key, fullPath);
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
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "IsActive", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductCategory.prototype, "SortOrder", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductCategory.prototype, "PhotoPath", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductCategory.prototype, "ProductCategoryDescription", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductCategory.prototype, "ProductCategorySlug", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        get() {
            return this.getDataValue("ProductCount");
        },
    }),
    __metadata("design:type", Number)
], ProductCategory.prototype, "ProductCount", void 0);
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
ProductCategory = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductCategory",
        paranoid: false,
        timestamps: false,
    })
], ProductCategory);
exports.default = ProductCategory;
