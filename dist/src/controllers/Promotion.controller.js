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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPromotions = void 0;
const Promotion_model_1 = require("../models/Promotion.model");
const getAllPromotions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotions = yield Promotion_model_1.Promotion.findAll();
        res.status(200).json(promotions);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPromotions = getAllPromotions;
