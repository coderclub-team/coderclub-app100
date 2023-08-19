import { Router } from "express";
import {
  calcelSubscription,
  getUserSubscriptions,
  subscribeProduct,
} from "../controllers/productSubscriptions.controller";
import handleSequelizeError from "../middlewares/handleSequelizeError";
import WalletBalance from "../middlewares/walletBalance.middleware";

const router = Router();

router.get("", getUserSubscriptions,handleSequelizeError);
router.post("",  WalletBalance,subscribeProduct,handleSequelizeError);
router.patch("/:SubscriptionGUID", calcelSubscription,handleSequelizeError);

export default router;
