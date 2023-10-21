import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import {
  findAll,
  findOneById,
  createCustomerRequest,
  deleteById,
} from "../controllers/customer.controller";
import StoreMaster from "../models/store-master.model";
router.use(
  "/:store_id",
  async (req: Request, res: Response, next: NextFunction) => {
   try {
    const store = await StoreMaster.findByPk(req.params.store_id);
    if (store === null) throw new Error("Store not found");
    next()
   } catch (error) {
    next(error);
   }

  }
);

router.get("/:store_id/customers", findAll);
router.get("/:store_id/customers/:customer_id", findOneById);
router.post("/:store_id/customers/create/request", createCustomerRequest);
router.delete("/:store_id/customers/:customer_id",deleteById);

export default router;
