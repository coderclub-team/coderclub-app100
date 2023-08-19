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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Message_model_1 = __importDefault(require("./Message.model"));
const User_model_1 = __importDefault(require("./User.model"));
const UserWalletBalances_1 = __importDefault(require("./UserWalletBalances"));
const ProductSubscriptions_model_1 = __importDefault(require("./ProductSubscriptions.model"));
const Sale_model_1 = __importDefault(require("./Sale.model"));
let UserWallet = class UserWallet extends sequelize_typescript_1.Model {
    static updateBalance(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.default.findByPk(instance.getDataValue("UserGUID"));
            const balance = yield UserWalletBalances_1.default.findOne({
                where: { UserGUID: instance.getDataValue("UserGUID") }
            });
            if (instance.getDataValue("Credit") > 0) {
                Message_model_1.default.sendRechargeSuccessMessage({
                    MobileNo: user === null || user === void 0 ? void 0 : user.getDataValue("MobileNo"),
                    RechargeAmount: instance.getDataValue("Credit"),
                    RechargeDate: instance.getDataValue("CreatedDate"),
                    Balance: balance === null || balance === void 0 ? void 0 : balance.getDataValue("Balance"),
                    DigitalCard: user === null || user === void 0 ? void 0 : user.DigitalCard,
                }).then((Response) => {
                    console.log("sendRechargeSuccessMessage Response", Response);
                })
                    .catch((error) => {
                    console.log("Error in sending message", error);
                });
            }
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], UserWallet.prototype, "WalletGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], UserWallet.prototype, "UserGUID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserWallet.prototype, "Description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], UserWallet.prototype, "Credit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], UserWallet.prototype, "Debit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP')
    }),
    __metadata("design:type", Date)
], UserWallet.prototype, "CreatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP')
    }),
    __metadata("design:type", Date)
], UserWallet.prototype, "UpdatedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], UserWallet.prototype, "DeletedDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], UserWallet.prototype, "CreatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], UserWallet.prototype, "UpdatedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], UserWallet.prototype, "DeletedGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        defaultValue: 'FULLFILLED'
    }),
    __metadata("design:type", String)
], UserWallet.prototype, "Status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserWallet.prototype, "PaymentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Sale_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserWallet.prototype, "SalesMasterGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Sale_model_1.default),
    __metadata("design:type", Sale_model_1.default)
], UserWallet.prototype, "Order", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ProductSubscriptions_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserWallet.prototype, "SubscriptionGUID", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ProductSubscriptions_model_1.default),
    __metadata("design:type", ProductSubscriptions_model_1.default)
], UserWallet.prototype, "Subscription", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserWallet]),
    __metadata("design:returntype", Promise)
], UserWallet, "updateBalance", null);
UserWallet = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: 'tbl_UserWallets',
        createdAt: 'CreatedDate',
        updatedAt: 'UpdatedDate',
        deletedAt: 'DeletedDate',
        hasTrigger: true,
    })
], UserWallet);
exports.default = UserWallet;
