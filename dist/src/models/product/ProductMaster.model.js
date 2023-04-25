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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// -- ProductGUID
// -- ProductID
// -- ProductName
// -- ProductCode
// -- ProductCategoryGUID
// -- ProductSubCategoryGUID
// -- Unit_Price
// -- MRP
// -- GST
// -- Qty
// -- UnitsInStock
// -- IsActive
// -- CreatedDate
// -- SKU
// -- UOM
// -- UOMTypeGUID
// -- PhotoPath
// -- ProductType
let ProductMaster = class ProductMaster extends sequelize_typescript_1.Model {
    static generateProductGUID(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextGUID = ((yield this.max("ProductGUID")) || 0) + 1;
            console.log({
                ProductID: instance.ProductID,
                nextGUID,
            });
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
        });
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], ProductMaster.prototype, "ProductGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductCode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "PhotoPath", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "ProductCategoryGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "ProductSubCategoryGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "Unit_Price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "MRP", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "GST", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "Qty", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "UnitsInStock", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], ProductMaster.prototype, "IsActive", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "SKU", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "UOM", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductMaster.prototype, "UOMTypeGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductMaster.prototype, "ProductType", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductMaster]),
    __metadata("design:returntype", Promise)
], ProductMaster, "generateProductGUID", null);
ProductMaster = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductMaster",
        timestamps: false,
        paranoid: false,
        // createdAt: "CreatedDate",
        // updatedAt: "ModifiedDate",
        // deletedAt: "DeletedDate",
    })
], ProductMaster);
exports.default = ProductMaster;
