// a /login route that will return a JWT token

import { Router } from "express";

import multer from "multer";
import { userImageUploadOptions } from "../../config";
import {
  login,
  register,
  sendOTP,
  resetPassword,
  verifyAccount,
  forgotPassword,
  getCurrentUser,
  getOrders,
  createOrder,
  cancelOrder,
} from "../controllers/auth.controller";
import handleSequelizeError from "../middlewares/handleSequelizeError";
import authGaurd from "../middlewares/authGaurd.middleware";
import { generateRazorpayIntent } from "../controllers/payment.controller";

const authRouter = Router();
const upload = multer({
  storage: userImageUploadOptions.storage,
  limits: userImageUploadOptions.limits,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

authRouter.post("/login", login, handleSequelizeError);
authRouter.post(
  "/register",
  upload.single("file"),
  register,
  handleSequelizeError
);

authRouter.post("/verify-account", verifyAccount, handleSequelizeError);
authRouter.post("/send-otp", sendOTP, handleSequelizeError);
authRouter.post("/reset-password", resetPassword, handleSequelizeError);
authRouter.post("/forget-password", forgotPassword, handleSequelizeError);
authRouter.get("/current-user", getCurrentUser, handleSequelizeError);

authRouter.get("/orders", authGaurd, getOrders,handleSequelizeError);
authRouter.post("/orders", authGaurd, createOrder,handleSequelizeError);
authRouter.patch("/orders/:SalesMasterGUID", authGaurd, cancelOrder,handleSequelizeError);
authRouter.get("/orders/payments/createOrder", authGaurd,generateRazorpayIntent,handleSequelizeError);

export default authRouter;
