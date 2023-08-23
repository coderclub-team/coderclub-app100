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
exports.Banner = exports.Walkthrough = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
require("dotenv").config();
let Walkthrough = class Walkthrough extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Walkthrough.prototype, "WalkthroughGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: "Title",
    }),
    __metadata("design:type", String)
], Walkthrough.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false,
        field: "Description",
    }),
    __metadata("design:type", String)
], Walkthrough.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        field: "PhotoPath",
        get() {
            const baseURL = process.env.NODE_ENV == "production"
                ? process.env.STATIC_FILE_URL
                : "http://localhost:3000";
            const path = this.getDataValue("image");
            return baseURL + "/" + path;
        },
    }),
    __metadata("design:type", String)
], Walkthrough.prototype, "image", void 0);
Walkthrough = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_Walkthrough",
        timestamps: false,
    })
], Walkthrough);
exports.Walkthrough = Walkthrough;
// Path: src/models/cms.model.ts
let Banner = class Banner extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Banner.prototype, "BannerGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        field: "Title",
    }),
    __metadata("design:type", String)
], Banner.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true,
        field: "Description",
    }),
    __metadata("design:type", String)
], Banner.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        field: "PhotoPath",
        get() {
            const baseURL = process.env.NODE_ENV == "production"
                ? process.env.STATIC_FILE_URL
                : "http://localhost:3000";
            const path = this.getDataValue("image");
            return baseURL + "/" + path;
        },
    }),
    __metadata("design:type", String)
], Banner.prototype, "image", void 0);
Banner = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_Banners",
        timestamps: false,
    })
], Banner);
exports.Banner = Banner;
