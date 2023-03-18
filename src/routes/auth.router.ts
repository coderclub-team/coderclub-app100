// a /login route that will return a JWT token

import { Router } from "express";
import { verify } from "jsonwebtoken";
import multer from "multer";
import { userImageUploadOptions } from "../../config";
import {
  login,
  register,
  resendOTP,
  resetPassword,
  verifyAccount,
} from "../controllers/auth.controller";
import handleSequelizeError from "../middlewares/handleSequelizeError";

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
authRouter.post("/resend-otp", resendOTP, handleSequelizeError);
authRouter.post("/reset-password", resetPassword, handleSequelizeError);

export default authRouter;
