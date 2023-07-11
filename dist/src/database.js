"use strict";
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
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config");
const ProductMaster_model_1 = __importDefault(require("./models/product/ProductMaster.model"));
const User_model_1 = __importDefault(require("./models/User.model"));
const ProductCategory_model_1 = __importDefault(require("./models/product/ProductCategory.model"));
const ProductSubCategory_model_1 = __importDefault(require("./models/product/ProductSubCategory.model"));
const Sale_model_1 = __importDefault(require("./models/Sale.model"));
const SaleDetail_model_1 = __importDefault(require("./models/SaleDetail.model"));
const GlobalType_model_1 = __importDefault(require("./models/GlobalType.model"));
const GlobalTypeCategory_nodel_1 = __importDefault(require("./models/GlobalTypeCategory.nodel"));
const ProductReview_model_1 = __importDefault(require("./models/product/ProductReview.model"));
exports.sequelize = new sequelize_typescript_1.Sequelize(config_1.sequelizeConnectionOptions);
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.sequelize
        .authenticate({
        logging: console.log,
        plain: true,
        raw: true,
    })
        .then(() => {
        console.log("Connection has been established successfully.");
    })
        .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
    exports.sequelize.addModels([
        User_model_1.default,
        ProductCategory_model_1.default,
        ProductSubCategory_model_1.default,
        ProductMaster_model_1.default,
        GlobalTypeCategory_nodel_1.default,
        GlobalType_model_1.default,
        Sale_model_1.default,
        SaleDetail_model_1.default,
        ProductReview_model_1.default,
    ]);
    User_model_1.default.sync();
    ProductCategory_model_1.default.sync();
    GlobalTypeCategory_nodel_1.default.sync();
    GlobalType_model_1.default.sync();
    ProductSubCategory_model_1.default.sync();
    ProductMaster_model_1.default.sync();
    ProductReview_model_1.default.sync();
    Sale_model_1.default.sync({
        schema: "dbo",
    });
    SaleDetail_model_1.default.sync();
    return exports.sequelize;
});
