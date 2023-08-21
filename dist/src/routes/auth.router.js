"use strict";
// a /login route that will return a JWT token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../../config");
const auth_controller_1 = require("../controllers/auth.controller");
const handle_sequelize_error_middleware_1 = __importDefault(require("../middlewares/handle-sequelize-error.middleware"));
const auth_gaurd_middleware_1 = __importDefault(require("../middlewares/auth-gaurd.middleware"));
const user_controller_1 = require("../controllers/user.controller.");
const payment_controller_1 = require("../controllers/payment.controller");
const authRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: config_1.userImageUploadOptions.storage,
    limits: config_1.userImageUploadOptions.limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});
authRouter.post("/login", auth_controller_1.login, handle_sequelize_error_middleware_1.default);
authRouter.post("/register", upload.single("file"), auth_controller_1.register, handle_sequelize_error_middleware_1.default);
// const upload = multer({
//   storage: userImageUploadOptions.storage,
//   limits: userImageUploadOptions.limits,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });
authRouter.put("/current-user", upload.single("file"), auth_gaurd_middleware_1.default, user_controller_1.updateUserById, handle_sequelize_error_middleware_1.default);
authRouter.post("/verify-account", auth_controller_1.verifyAccount, handle_sequelize_error_middleware_1.default);
authRouter.post("/send-otp", auth_controller_1.sendOTP, handle_sequelize_error_middleware_1.default);
authRouter.post("/reset-password", auth_controller_1.resetPassword, handle_sequelize_error_middleware_1.default);
authRouter.post("/update-email", auth_controller_1.resetPassword, handle_sequelize_error_middleware_1.default);
authRouter.post("/forget-password", auth_controller_1.forgotPassword, handle_sequelize_error_middleware_1.default);
authRouter.get("/current-user", auth_gaurd_middleware_1.default, auth_controller_1.getCurrentUser, handle_sequelize_error_middleware_1.default);
authRouter.get("/orders", auth_gaurd_middleware_1.default, auth_controller_1.getOrders, handle_sequelize_error_middleware_1.default);
authRouter.post("/orders", auth_gaurd_middleware_1.default, auth_controller_1.createOrder, handle_sequelize_error_middleware_1.default);
authRouter.patch("/orders/:SalesMasterGUID", auth_gaurd_middleware_1.default, auth_controller_1.cancelOrder, handle_sequelize_error_middleware_1.default);
authRouter.get("/orders/payments/createOrder", auth_gaurd_middleware_1.default, payment_controller_1.generateRazorpayIntent, handle_sequelize_error_middleware_1.default);
exports.default = authRouter;
