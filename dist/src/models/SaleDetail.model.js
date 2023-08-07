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
const Sale_model_1 = __importDefault(require("./Sale.model"));
const ProductMaster_model_1 = __importDefault(require("./product/ProductMaster.model"));
let SaleDetail = class SaleDetail extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        autoIncrementIdentity: true,
    }),
    __metadata("design:type", Number)
], SaleDetail.prototype, "SalesDetailGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Sale_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "SalesMasterGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Sale_model_1.default),
    __metadata("design:type", Sale_model_1.default)
], SaleDetail.prototype, "SalesMasterRef", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ProductMaster_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "ProductGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ProductMaster_model_1.default),
    __metadata("design:type", ProductMaster_model_1.default)
], SaleDetail.prototype, "product", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SaleDetail.prototype, "ProductName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SaleDetail.prototype, "ProductCode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "Qty", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "MRP", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "SaleRate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "SGST", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "CGST", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "DiscountPercent", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "DiscAmt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "TaxAmount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "Amount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SaleDetail.prototype, "CreatedGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], SaleDetail.prototype, "CreatedDate", void 0);
SaleDetail = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_SalesDetails",
        timestamps: false,
        paranoid: false,
    })
], SaleDetail);
exports.default = SaleDetail;
// EXEC sp_help tbl_SalesDetails
// SalesDetailGUID
// SalesMasterGUID
// ProductGUID
// ProductCode
// Qty
// MRP
// SaleRate
// SGST
// CGST
// DiscountPercent
// DiscAmt
// TaxAmount
// Amount
// CreatedGUID
// CreatedDate
