// a /login route that will return a JWT token

import { Router } from "express";
import multer from "multer";
import { userImageUploadOptions } from "../../config";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.";
import handleSequelizeError from "../middlewares/handleSequelizeError";

const userRouter = Router();


userRouter.get("/", getAllUsers);
userRouter.get("/:UserGUID", getUserById);

userRouter.delete("/:UserGUID", deleteUserById, handleSequelizeError);

export default userRouter;
