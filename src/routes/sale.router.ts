import { Router } from "express";
import { getAllSales } from "../controllers/sale.controller";
// import {
//   createLineMan,
//   deleteLineMan,
//   getAllLineMen,
//   getLineManById,
//   updateLineMan,
// } from "../controllers/lineMenu.controller";

const router = Router();

router.get("/", getAllSales);
// router.get("/:LineManGUID", getLineManById);
// router.post("/", createLineMan);
// router.put("/:LineManGUID", updateLineMan);
// router.delete("/:LineManGUID", deleteLineMan);

// router.get("/", getAllLineMen);

export default router;
