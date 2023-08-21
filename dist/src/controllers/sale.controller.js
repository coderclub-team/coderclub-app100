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
exports.getSaleById = exports.getAllSales = void 0;
const sale_detail_model_1 = __importDefault(require("../models/sale-detail.model"));
const sale_model_1 = __importDefault(require("../models/sale.model"));
const global_type_model_1 = __importDefault(require("../models/global-type.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
function getAllSales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const salemasters = yield sale_model_1.default.findAll({
            attributes: {
                exclude: ["CustomerGUID", "SaleTypeRef"],
            },
            include: [
                {
                    model: user_model_1.default,
                    as: "Customer",
                },
                {
                    model: global_type_model_1.default,
                    as: "SaleTypeRef",
                    //  Sale type shoudl be astring value of arributes.GlobaleTypeName
                    attributes: {
                        include: ["GlobalTypeName"],
                        exclude: ["GlobalTypeGUID"],
                    },
                },
                {
                    model: sale_detail_model_1.default,
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
function getSaleById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { SalemanGUID } = req.params;
        const sale = yield sale_model_1.default.findOne({
            where: {
                SalemanGUID: SalemanGUID,
            },
            include: [
                {
                    model: user_model_1.default,
                    as: "Customer",
                },
                {
                    model: global_type_model_1.default,
                    as: "SaleTypeRef",
                    //  Sale type shoudl be astring value of arributes.GlobaleTypeName
                    attributes: {
                        include: ["GlobalTypeName"],
                        exclude: ["GlobalTypeGUID"],
                    },
                },
                {
                    model: sale_detail_model_1.default,
                    all: true,
                },
            ],
        });
        if (!sale) {
            return res.status(404).json({
                message: "Sale not found",
            });
        }
        if (sale.SaleTypeRef) {
            sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
            sale.setDataValue("SaleTypeRef", undefined);
        }
        res.status(200).json(sale);
    });
}
exports.getSaleById = getSaleById;
