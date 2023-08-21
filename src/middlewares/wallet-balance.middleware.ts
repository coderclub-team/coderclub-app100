import { NextFunction, Request, Response, response } from "express";
import UserWalletBalance from "../models/user-wallet-balance.model";

export default async function WalletBalance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const balance= await  UserWalletBalance.findOne({
        where: {    
            UserGUID: req.body.user.UserGUID,
        },
    });
    req.body.WalletBalance = balance?.getDataValue("Balance");
    next();
  } catch (error) {
    next(error);
  }
}
