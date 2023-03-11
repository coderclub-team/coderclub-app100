// a /login route that will return a JWT token

import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:MobileNo", getUserById);
userRouter.delete("/:MobileNo", deleteUserById);
userRouter.put("/:MobileNo", updateUserById);

export default userRouter;
