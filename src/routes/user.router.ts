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
userRouter.get("/:MobileNo", getUserById);
userRouter.put(
  "/:userGUID",
  upload.single("file"),
  updateUserById,
  handleSequelizeError
);
userRouter.delete("/:MobileNo", deleteUserById);

export default userRouter;
