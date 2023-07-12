// a /login route that will return a JWT token

import { Router } from "express";
import multer from "multer";
import { userImageUploadOptions } from "../../config";
import {
  createAddress,
  deleteAddress,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateAddress,
  updateUserById,
} from "../controllers/userController.";
import authGaurdMiddleware from "../middlewares/authGaurd.middleware";
import handleSequelizeError from "../middlewares/handleSequelizeError";
import authRouter from "./auth.router";

const userRouter = Router();
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

userRouter.get("/", getAllUsers);
userRouter.get("/:UserGUID", getUserById);
userRouter.put(
  "/:UserGUID",
  upload.single("file"),
  updateUserById,
  handleSequelizeError
);
userRouter.delete("/:UserGUID", deleteUserById, handleSequelizeError);
userRouter.post("/:UserGUID/addresses", createAddress, handleSequelizeError);
userRouter.put("/:UserGUID/addresses", updateAddress, handleSequelizeError);
userRouter.delete("/:UserGUID/addresses", deleteAddress, handleSequelizeError);
export default userRouter;
