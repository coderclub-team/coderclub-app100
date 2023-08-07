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
const GlobalType_model_1 = __importDefault(require("./GlobalType.model"));
const User_model_1 = __importDefault(require("./User.model"));
const SaleDetail_model_1 = __importDefault(require("./SaleDetail.model"));
let Sale = class Sale extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sale.prototype, "SalesMasterGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Sale.prototype, "SaleOrderID", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => GlobalType_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        field: "SaleType",
    }),
    __metadata("design:type", String)
], Sale.prototype, "SaleType", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => GlobalType_model_1.default),
    __metadata("design:type", GlobalType_model_1.default)
], Sale.prototype, "SaleTypeRef", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sale.prototype, "PaymentMode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sale.prototype, "SalemanGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sale.prototype, "LinemanGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sale.prototype, "StoreGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sale.prototype, "CreatedGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Sale.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sale.prototype, "CustomerGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Sale.prototype, "UpdatedDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Sale.prototype, "DeletedDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Sale.prototype, "Status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => SaleDetail_model_1.default, {
        foreignKey: "SalesMasterGUID",
        as: "SaleDetails",
    }),
    __metadata("design:type", Array)
], Sale.prototype, "SaleDetails", void 0);
Sale = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_SalesMaster",
        timestamps: false,
        createdAt: "CreatedDate",
        updatedAt: "UpdatedDate",
        deletedAt: "DeletedDate",
        paranoid: false,
    })
], Sale);
exports.default = Sale;
