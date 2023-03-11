import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import User from "../models/User.model";

const uniqueUserGaurd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo, EmailAddress, LoginName } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ MobileNo }, { EmailAddress }, { LoginName }],
      },
    });
    if (user) {
      const message =
        user.MobileNo === MobileNo
          ? "MobileNo already exists!"
          : user.EmailAddress === EmailAddress
          ? "EmailAddress already exists!"
          : user.LoginName === LoginName
          ? "LoginName already exists!"
          : "User already exists!";

      return res.status(400).json({
        message,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
export default uniqueUserGaurd;
