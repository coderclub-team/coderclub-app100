import { Router } from "express";
import BillingCycles from "../models/product/BillingCycles.model";
const billingcyclesRouter = Router();
billingcyclesRouter.all("", async (req, res) => {
  const billingcycles = await BillingCycles.findAll();
  res.send({
    billingcycles,
  });
});

export { billingcyclesRouter };
