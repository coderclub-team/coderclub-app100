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
let Store = class Store extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        field: "StoreGUID",
    }),
    __metadata("design:type", Number)
], Store.prototype, "StoreGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "StoreID",
        unique: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "StoreID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "StoreName",
        allowNull: false,
    }),
    __metadata("design:type", String)
], Store.prototype, "StoreName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "Phone",
        allowNull: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "Phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "Email",
        allowNull: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "Email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "Address",
        allowNull: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "Address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "City",
        allowNull: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "City", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "State",
        allowNull: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "State", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "PinCode",
        allowNull: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "PinCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "GSTNO",
        allowNull: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "GSTNO", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "CreatedDate",
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Store.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "ModifiedDate",
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Store.prototype, "ModifiedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "DeletedDate",
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Store.prototype, "DeletedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "CreatedGUID",
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Store.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "ModifiedGUID",
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Store.prototype, "ModifiedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: "DeletedGUID",
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Store.prototype, "DeletedGUID", void 0);
Store = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_StoreMaster",
        timestamps: true,
        createdAt: "CreatedDate",
        updatedAt: "ModifiedDate",
        deletedAt: "DeletedDate",
        paranoid: true,
    })
], Store);
exports.default = Store;
