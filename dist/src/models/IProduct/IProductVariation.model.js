"use strict";
// USE [GKDairy]
// GO
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
exports.IProductVariation = void 0;
// /****** Object:  Table [dbo].[tbl_IProductVariation]    Script Date: 04/20/2023 06:10:43 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// SET ANSI_PADDING ON
// GO
// CREATE TABLE [dbo].[tbl_IProductVariation](
// 	[ProductVariationGUID] [uniqueidentifier] NOT NULL,
// 	[ProductGUID] [uniqueidentifier] NOT NULL,
// 	[AttributeValue] [varchar](50) NOT NULL,
// 	[AttributeName] [varchar](50) NOT NULL,
// PRIMARY KEY CLUSTERED
// (
// 	[ProductVariationGUID] ASC
// )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
// UNIQUE NONCLUSTERED
// (
// 	[AttributeName] ASC
// )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
// ) ON [PRIMARY]
// GO
// SET ANSI_PADDING OFF
// GO
// ALTER TABLE [dbo].[tbl_IProductVariation]  WITH CHECK ADD FOREIGN KEY([ProductGUID])
// REFERENCES [dbo].[tbl_IProduct] ([ProductGUID])
// GO
const sequelize_typescript_1 = require("sequelize-typescript");
let IProductVariation = class IProductVariation extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], IProductVariation.prototype, "ProductVariationGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], IProductVariation.prototype, "ProductRefGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], IProductVariation.prototype, "AttributeName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    __metadata("design:type", String)
], IProductVariation.prototype, "AttributeValue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], IProductVariation.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], IProductVariation.prototype, "ModifiedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
    }),
    __metadata("design:type", String)
], IProductVariation.prototype, "DeletedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], IProductVariation.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], IProductVariation.prototype, "ModifiedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], IProductVariation.prototype, "DeletedDate", void 0);
IProductVariation = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_IProductVariation",
        timestamps: true,
        paranoid: true,
        updatedAt: "ModifiedDate",
        createdAt: "CreatedDate",
        deletedAt: "DeletedDate",
    })
], IProductVariation);
exports.IProductVariation = IProductVariation;
