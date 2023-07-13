import { Router } from "express";
import {
  getUserSubscriptions,
  subscribeProduct,
} from "../controllers/productSubscriptions.controller";

const router = Router();

router.get("", getUserSubscriptions);
router.post("", subscribeProduct);

export default router;
