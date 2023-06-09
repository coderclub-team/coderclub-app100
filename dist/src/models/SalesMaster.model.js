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
let SalesMaster = class SalesMaster extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        autoIncrementIdentity: true,
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], SalesMaster.prototype, "SalesMasterGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: "tbl_GlobalType",
            key: "GlobalTypeGUID",
        },
    }),
    __metadata("design:type", Number)
], SalesMaster.prototype, "SaleType", void 0);
SalesMaster = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_SalesMaster",
        timestamps: true,
        createdAt: "CreatedDate",
        updatedAt: false,
        deletedAt: false,
        paranoid: false,
    })
], SalesMaster);
exports.default = SalesMaster;
