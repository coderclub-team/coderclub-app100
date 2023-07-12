import express from "express";
import {
  addCartItem,
  getCartItems,
  deleteCartItem,
} from "../controllers/userController.";
import handleSequelizeError from "../middlewares/handleSequelizeError";

const router = express.Router();

router.get("", getCartItems, handleSequelizeError);
router.post("", addCartItem, handleSequelizeError);
router.delete("", deleteCartItem, handleSequelizeError);

export default router;
