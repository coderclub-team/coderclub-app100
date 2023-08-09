"use strict";
// tbl_ProductReviews model
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
const ProductMaster_model_1 = __importDefault(require("./ProductMaster.model"));
const User_model_1 = __importDefault(require("../User.model"));
// ReviewGUID;
// Review;
// ProductGUID;
// CreatedUserGUID;
// CreatedDate;
let ProductReview = class ProductReview extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductReview.prototype, "ReviewGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        references: {
            key: "ProductGUID",
            model: "ProductMaster",
        },
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => ProductMaster_model_1.default),
    __metadata("design:type", String)
], ProductReview.prototype, "ProductGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        references: {
            key: "UserGUID",
            model: "User",
        },
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    __metadata("design:type", String)
], ProductReview.prototype, "CreatedUserGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_model_1.default),
    __metadata("design:type", User_model_1.default)
], ProductReview.prototype, "User", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ProductReview.prototype, "CreatedDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProductReview.prototype, "Review", void 0);
ProductReview = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "tbl_ProductReviews",
        timestamps: false,
    })
], ProductReview);
exports.default = ProductReview;
