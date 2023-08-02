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
exports.calcelSubscription = exports.subscribeProduct = exports.getUserSubscriptions = void 0;
const decodeJWT_1 = __importDefault(require("../utils/decodeJWT"));
const functions_1 = require("../utils/functions");
const ProductSubscriptions_model_1 = __importDefault(require("../models/ProductSubscriptions.model"));
const BillingCycles_model_1 = __importDefault(require("../models/product/BillingCycles.model"));
const getUserSubscriptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    const where = (0, functions_1.omitUndefined)({
        userGUID: req.body.CreatedGUID,
        SubscriptionGUID: req.body.SubscriptionGUID,
    });
    try {
        const subscriptions = yield ProductSubscriptions_model_1.default.findAll({
            where: where,
        });
        res.status(200).json(subscriptions);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserSubscriptions = getUserSubscriptions;
const subscribeProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    req.body.UserGUID = req.body.CreatedGUID;
    if (!req.body.CreatedGUID) {
        throw Error("ProductGUID is required for subscription!");
    }
    else if (!req.body.PaymentMethod) {
        throw Error("PaymentMethod is required for subscription!");
    }
    try {
        const billingcycle = yield BillingCycles_model_1.default.findByPk(req.body.BillingCycleGUID);
        if (!billingcycle)
            throw Error("Invalid billing cycle!");
        //   @Column
        // BillingCycleName!: string;
        // @Column
        // NumberOfCycles!: string;
        const cycle_name = billingcycle.getDataValue("BillingCycleName");
        const num_cycles = billingcycle.getDataValue("NumberOfCycles");
        switch (cycle_name) {
            case "Daily":
                {
                }
                break;
            case "Monthly":
                {
                }
                break;
        }
        //  "ProductGUID"; 1,
        // BillingCycleGUID; req.body
        // PaymentMethod;req.body
        // SubscriptionPrice;req.body
        // SubscriptionStartDate;req.body
        // SubscriptionEndDate;req.body
        //SubscriptionOccurrences;
        const subscription = yield ProductSubscriptions_model_1.default.create(req.body);
        console.log("subscription", subscription.toJSON());
        res.status(200).send({
            message: "Subscription created successfully!",
            subscription,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.subscribeProduct = subscribeProduct;
const calcelSubscription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { SubscriptionGUID } = req.params;
    const { Status } = req.body;
    if (req.body.user) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    req.body.UserGUID = req.body.CreatedGUID;
    if (!Status) {
        throw new Error("Status is required");
    }
    try {
        const productSubscription = yield ProductSubscriptions_model_1.default.findByPk(SubscriptionGUID);
        if (!productSubscription)
            throw Error("Invalid subscription!");
        productSubscription.Status = Status;
        const subscription = yield productSubscription.save();
        res.status(200).send({
            message: "Subscription updated successfully!",
            subscription,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.calcelSubscription = calcelSubscription;
