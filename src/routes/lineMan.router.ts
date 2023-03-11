import { Router } from "express";
import {
  createLineMan,
  deleteLineMan,
  getAllLineMen,
  getLineManById,
  updateLineMan,
} from "../controllers/lineMenu.controller";

const router = Router();

router.get("/", getAllLineMen);
router.get("/:LineManGUID", getLineManById);
router.post("/", createLineMan);
router.put("/:LineManGUID", updateLineMan);
router.delete("/:LineManGUID", deleteLineMan);

router.get("/", getAllLineMen);

export default router;
