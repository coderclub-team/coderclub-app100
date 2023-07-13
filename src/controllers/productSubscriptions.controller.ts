import { NextFunction, Request, Response } from "express";
import decodeJWT from "../utils/decodeJWT";
import { omitUndefined } from "../utils/functions";
import { MyWhereType } from "../..";
import ProductSubscription from "../models/ProductSubscriptions.model";
import BillingCycles from "../models/product/BillingCycles.model";

export const getUserSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }
  const where: MyWhereType = omitUndefined({
    userGUID: req.body.CreatedGUID,
    SubscriptionGUID: req.body.SubscriptionGUID,
  });

  try {
    const subscriptions = await ProductSubscription.findAll({
      where: where,
    });

    res.send({
      message: "",
      subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const subscribeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }
  req.body.UserGUID = req.body.CreatedGUID;
  if (!req.body.CreatedGUID) {
    throw Error("ProductGUID is required for subscription!");
  } else if (!req.body.PaymentMethod) {
    throw Error("PaymentMethod is required for subscription!");
  }
  try {
    const billingcycle = await BillingCycles.findByPk(
      req.body.BillingCycleGUID
    );
    if (!billingcycle) throw Error("Invalid billing cycle!");
    //   @Column
    // BillingCycleName!: string;
    // @Column
    // NumberOfCycles!: string;
    const cycle_name = billingcycle.getDataValue("BillingCycleName");
    const num_cycles = billingcycle.getDataValue("NumberOfCycles");
    switch (cycle_name) {
      case "Daily":
        {
        }
        break;
      case "Monthly":
        {
        }
        break;
    }
    //  "ProductGUID"; 1,
    // BillingCycleGUID; req.body
    // PaymentMethod;req.body
    // SubscriptionPrice;req.body
    // SubscriptionStartDate;req.body
    // SubscriptionEndDate;req.body
    //SubscriptionOccurrences;
    const subscription = await ProductSubscription.create(req.body);
    console.log("subscription", subscription.toJSON());
    res.send("OKAY");
  } catch (error) {
    next(error);
  }
};
