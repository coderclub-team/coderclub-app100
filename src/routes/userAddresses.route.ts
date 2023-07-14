import express from "express";
import handleSequelizeError from "../middlewares/handleSequelizeError";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../controllers/userAddress.conroller";

const router = express.Router();
router.post("", createAddress, handleSequelizeError);
router.put("/:AddressGUID", updateAddress, handleSequelizeError);
router.delete("/:AddressGUID", deleteAddress, handleSequelizeError);

export default router;
