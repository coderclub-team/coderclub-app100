import express from "express";
import {
  addCartItem,
  getCartItems,
} from "../controllers/userController.";
import handleSequelizeError from "../middlewares/handleSequelizeError";

const router = express.Router();

router.get("", getCartItems, handleSequelizeError);
router.post("", addCartItem, handleSequelizeError);

export default router;
