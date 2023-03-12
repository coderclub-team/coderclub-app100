// a /login route that will return a JWT token

import { Router } from "express";
import multer from "multer";
import { userImageUploadOptions } from "../../config";
import { login, register } from "../controllers/auth.controller";
import handleSequelizeError from "../middlewares/handleSequelizeError";
import uniqueUserGaurd from "../middlewares/uniqueUserGaurd.middleware";

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

authRouter.post("/login", login);
authRouter.post(
  "/register",
  upload.single("file"),
  register,
  handleSequelizeError
);

export default authRouter;
