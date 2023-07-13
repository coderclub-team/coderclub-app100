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
const ProductMaster_model_1 = __importDefault(require("./product/ProductMaster.model"));
const User_model_1 = __importDefault(require("./User.model"));
const BillingCycles_model_1 = __importDefault(require("./product/BillingCycles.model"));
let ProductSubscription = class ProductSubscription extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], ProductSubscription.prototype, "SubscriptionGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductSubscription.prototype, "UserGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ProductMaster_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductSubscription.prototype, "ProductGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ProductSubscription.prototype, "SubscriptionStartDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ProductSubscription.prototype, "SubscriptionEndDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductSubscription.prototype, "SubscriptionOccurrences", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", String)
], ProductSubscription.prototype, "SubscriptionStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => BillingCycles_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProductSubscription.prototype, "BillingCycleGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductSubscription.prototype, "SubscriptionPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], ProductSubscription.prototype, "PaymentMethod", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ProductSubscription.prototype, "LastPaymentDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ProductSubscription.prototype, "NextPaymentDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ProductSubscription.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ProductSubscription.prototype, "UpdatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], ProductSubscription.prototype, "DeletedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductSubscription.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductSubscription.prototype, "UpdatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ProductSubscription.prototype, "DeletedGUID", void 0);
ProductSubscription = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductSubscriptions",
        createdAt: "CreatedDate",
        updatedAt: "UpdatedDate",
        deletedAt: "DeletedDate",
    })
], ProductSubscription);
exports.default = ProductSubscription;
