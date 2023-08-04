import { NextFunction, Request, Response } from "express";
import decodeJWT from "../utils/decodeJWT";
import User from "../models/User.model";
import UserWallet from "../models/UserWallet";
import UserWalletBalance from "../models/UserWalletBalances";
export const getWalletTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }
  try {
    const { count, rows: transactions } = await UserWallet.findAndCountAll({
      where: {
        UserGUID: req.body.CreatedGUID,
        Status: "FULLFILLED",
      },
      order: [["CreatedDate", "DESC"]],
    });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};
export const creditOrDebit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  const { type, amount, CreatedGUID } = req.body;
  if(!amount || amount <= 0 && isNaN(amount)){
    throw new Error("Invalid amount");
  }
  try {
    let transaction;
    if (new String(type).toUpperCase() === "CREDIT") {
      console.log("come here", CreatedGUID);
      transaction = await UserWallet.create({
        UserGUID: CreatedGUID,
        Credit: amount,
        Debit: 0,
        CreatedGUID: CreatedGUID,
        Status: "FULLFILLED",
      });
    } else if (new String(type).toUpperCase() === "DEBIT") {
      const walletBalance = await UserWalletBalance.findOne({
        where: { UserGUID: CreatedGUID },
      });
      if (walletBalance && walletBalance.Balance < amount) {
        throw new Error("Insufficient balance");
      } 

        transaction = await UserWallet.create({
          UserGUID: CreatedGUID,
          Credit: 0,
          Debit: amount,
          CreatedGUID: CreatedGUID,
          Status: "FULLFILLED",
        });

    } else {
      return res.status(400).json({ message: "Invalid request" });
    }

  

    res.json({
      message: "Transaction successful",
      transaction,
      balance: await UserWalletBalance.findOne({
        where: { UserGUID: req.body.CreatedGUID },
      }).then((t) => t?.Balance),
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const getWalletBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        if (req.body.user) {
            req.body.CreatedGUID = req.body.user.UserGUID;
        } else {
            req.body.CreatedGUID = decodeJWT(req).UserGUID;
        }
        try {
            const balance = await UserWalletBalance.findOne({
                where: { UserGUID: req.body.CreatedGUID },
            });
            res.json([balance]);
        } catch (error) {
            next(error);
        }
    }
