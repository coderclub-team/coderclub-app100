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
exports.IProduct = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let IProduct = class IProduct extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], IProduct.prototype, "ProductGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        validate: {
            isIn: [["Simple Product", "Variable Product"]],
        },
    }),
    __metadata("design:type", String)
], IProduct.prototype, "ProductType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], IProduct.prototype, "ProductName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true,
    }),
    __metadata("design:type", String)
], IProduct.prototype, "Description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        unique: true, // check if it is unique
    }),
    __metadata("design:type", String)
], IProduct.prototype, "ProductCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        unique: true, // check if it is unique
    }),
    __metadata("design:type", String)
], IProduct.prototype, "ProductID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        references: {
            model: "tbl_User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", String)
], IProduct.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        references: {
            model: "tbl_User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", String)
], IProduct.prototype, "ModifiedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        references: {
            model: "tbl_User",
            key: "UserGUID",
        },
    }),
    __metadata("design:type", String)
], IProduct.prototype, "DeletedGUID", void 0);
IProduct = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_IProduct",
        timestamps: false,
        paranoid: false,
        updatedAt: "ModifiedDate",
        createdAt: "CreatedDate",
        deletedAt: "DeletedDate",
    })
], IProduct);
exports.IProduct = IProduct;
