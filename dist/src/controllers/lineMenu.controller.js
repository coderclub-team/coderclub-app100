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
exports.deleteLineMan = exports.updateLineMan = exports.createLineMan = exports.getLineManById = exports.getAllLineMen = void 0;
const LineMan_model_1 = __importDefault(require("../models/LineMan.model"));
const decodeJWT_1 = __importDefault(require("../utils/decodeJWT"));
const getAllLineMen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lineMen = yield LineMan_model_1.default.findAll({
        attributes: {
            exclude: ["DeletedGUID", "DeletedDate"],
        },
    });
    res.status(200).json({
        message: "All linemen fetched successfully",
        lineMen,
    });
});
exports.getAllLineMen = getAllLineMen;
const getLineManById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { LineManGUID } = req.params;
    const lineMan = yield LineMan_model_1.default.findByPk(LineManGUID, {
        attributes: {
            exclude: ["DeletedGUID", "DeletedDate"],
        },
    });
    if (!lineMan) {
        res.status(404).json({
            message: "LineMan not found",
        });
    }
    else {
        res.status(200).json({
            message: "LineMan fetched successfully",
            lineMan,
        });
    }
});
exports.getLineManById = getLineManById;
const createLineMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const lineMan = yield LineMan_model_1.default.create(req.body);
    res.status(201).json({
        message: "LineMan created successfully",
        lineMan,
    });
});
exports.createLineMan = createLineMan;
const updateLineMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.ModifiedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.ModifiedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const { LineManGUID } = req.params;
    const lineMan = yield LineMan_model_1.default.findByPk(LineManGUID);
    if (!lineMan) {
        res.status(404).json({
            message: "LineMan not found",
        });
    }
    else {
        if (req.body.user) {
            req.body.ModifiedGUID = req.body.user.UserGUID;
        }
        else {
            req.body.ModifiedGUID = (0, decodeJWT_1.default)(req).UserGUID;
        }
        yield lineMan.update(req.body);
        res.status(200).json({
            message: "LineMan updated successfully",
            lineMan,
        });
    }
});
exports.updateLineMan = updateLineMan;
const deleteLineMan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.DeletedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.DeletedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const { LineManGUID } = req.params;
    const lineMan = yield LineMan_model_1.default.findByPk(LineManGUID);
    if (!lineMan) {
        res.status(404).json({
            message: "LineMan not found",
        });
    }
    else {
        if (req.body.user) {
            req.body.DeletedGUID = req.body.user.UserGUID;
        }
        else {
            req.body.DeletedGUID = (0, decodeJWT_1.default)(req).UserGUID;
        }
        yield lineMan.update(req.body);
        res.status(200).json({
            message: "LineMan deleted successfully",
            lineMan,
        });
    }
});
exports.deleteLineMan = deleteLineMan;
