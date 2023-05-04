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
exports.getAllSales = void 0;
const SaleDetail_model_1 = __importDefault(require("../models/SaleDetail.model"));
const Sale_model_1 = __importDefault(require("../models/Sale.model"));
const GlobalType_model_1 = __importDefault(require("../models/GlobalType.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
function getAllSales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const salemasters = yield Sale_model_1.default.findAll({
            attributes: {
                exclude: ["CustomerGUID", "SaleTypeRef"],
            },
            include: [
                {
                    model: User_model_1.default,
                    as: "Customer",
                },
                {
                    model: GlobalType_model_1.default,
                    as: "SaleTypeRef",
                    //  Sale type shoudl be astring value of arributes.GlobaleTypeName
                    attributes: {
                        include: ["GlobalTypeName"],
                        exclude: ["GlobalTypeGUID"],
                    },
                },
                {
                    model: SaleDetail_model_1.default,
                    all: true,
                },
            ],
        });
        salemasters.forEach((sale) => {
            if (sale.SaleTypeRef) {
                sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
                sale.setDataValue("SaleTypeRef", undefined);
            }
        });
        res.status(200).json(salemasters);
    });
}
exports.getAllSales = getAllSales;
