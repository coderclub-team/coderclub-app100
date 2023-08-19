import { NextFunction, Request, Response } from "express";
import decodeJWT from "../utils/decodeJWT";
import { omitUndefined } from "../utils/functions";
import { MyWhereType } from "../..";
import ProductSubscription from "../models/ProductSubscriptions.model";
import BillingCycles from "../models/product/BillingCycles.model";
import { Op } from "sequelize";
import ProductMaster from "../models/product/ProductMaster.model";
import { sequelize } from "../database";
import UserWallet from "../models/UserWallet";

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
      include: [
        {
          model: ProductMaster,
        },
      ],
    });
    subscriptions.forEach((subscription) => {
      subscription?.Product?.setFullURL(req, "PhotoPath");
    });

    res.status(200).json(subscriptions);
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
 
  try {
    if (!req.body.ProductGUID) {
      throw Error("ProductGUID is required for subscription");
    } else if (!req.body.SubscriptionPrice) {
      throw Error("SubscriptionPrice is required for subscription");
    } else if (!req.body.SubscriptionStartDate) {
      throw Error("SubscriptionStartDate is required for subscription");
    } else if (!req.body.SubscriptionEndDate) {
      throw Error("SubscriptionEndDate is required for subscription");
    } else if (!req.body.SubscriptionOccurrences) {
      throw Error("SubscriptionOccurrences is required for subscription");
    } else if (!req.body.BillingCycleGUID) {
      throw Error("BillingCycleGUID is required for subscription");
    } else if (req.body.WalletBalance < req.body.SubscriptionPrice) {
      throw Error("Insufficient balance in wallet");
    }

    await sequelize.transaction(async (t) => {
      try {
        const billingcycle = await BillingCycles.findByPk(
          req.body.BillingCycleGUID,
          {
            transaction: t,
          }
        );
        if (!billingcycle) throw Error("Invalid billing cycle!");
        const cycle_name = billingcycle.getDataValue("BillingCycleName");
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
        const updatedWallet = await UserWallet.create({
          UserGUID: req.body.CreatedGUID,
          Debit: req.body.SubscriptionPrice,
          CreatedGUID: req.body.CreatedGUID,
        });
        const subscription = await ProductSubscription.create(
          {
            ...req.body,
            PaymentTransactionId: updatedWallet.getDataValue("WalletGUID"),
            PaymentMethod: "WALLET",
          },
          {
            transaction: t,
          }
        );
        console.log("subscription", subscription.toJSON());
        res.status(200).send({
          message: "Subscription created successfully!",
          subscription: subscription.toJSON(),
          updatedWalletBalance:
            req.body.WalletBalance - updatedWallet.getDataValue("Debit"),
        });
      } catch (error) {
        await t.rollback();
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const calcelSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { SubscriptionGUID } = req.params;
  const { Status } = req.body;

  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }
  req.body.UserGUID = req.body.CreatedGUID;

  if (!Status) {
    throw new Error("Status is required");
  }
  try {
    const productSubscription = await ProductSubscription.findByPk(
      SubscriptionGUID
    );
    if (!productSubscription) throw Error("Invalid subscription!");
    productSubscription.Status = Status;
    const subscription = await productSubscription.save();
    res.status(200).send({
      message: "Subscription updated successfully!",
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const expireSubscription = async () => {
  try {
    const expiredSubscriptions = await ProductSubscription.findAll({
      where: {
        SubscriptionEndDate: {
          [Op.lt]: new Date(),
        },
        Status: {
          [Op.notIn]: ["EXPIRED", "CANCELLED"],
        },
      },
    });

    expiredSubscriptions.forEach(async (subscription) => {
      subscription.Status = "EXPIRED";
      const updatedSubscription = await subscription.save();
      console.log("expiry updated by a cron", updatedSubscription.toJSON());
    });
  } catch (error: any) {
    console.log("expireSubscription_Fn", error.message);
  }

  // Do something with the expired subscriptions
};
