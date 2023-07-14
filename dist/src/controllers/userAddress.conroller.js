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
exports.deleteAddress = exports.updateAddress = exports.createAddress = void 0;
const UserAddress_model_1 = __importDefault(require("../models/UserAddress.model"));
const decodeJWT_1 = __importDefault(require("../utils/decodeJWT"));
const createAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    req.body.UserGUID = req.body.CreatedGUID;
    try {
        const address = yield UserAddress_model_1.default.create(req.body);
        res.send({
            message: "User address added successfully!",
            address,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAddress = createAddress;
const updateAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    try {
        const address = yield UserAddress_model_1.default.findByPk(req.params.AddressGUID);
        if (!address)
            throw Error("Invalid AddressGUID!");
        delete req.body.UserAddressGUID;
        const useraddress = yield address.update(req.body);
        res.status(200).send({
            message: "User addredd updated successfully!",
            useraddress,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAddress = updateAddress;
const deleteAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    try {
        const address = yield UserAddress_model_1.default.findByPk(req.params.AddressGUID);
        if (!address)
            throw Error("Invalid AddressGUID!");
        yield address.destroy();
        res.status(200).send({
            message: "User address deleted successfully!",
            params: req.params,
            address,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAddress = deleteAddress;
