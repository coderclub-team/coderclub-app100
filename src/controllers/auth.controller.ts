import { NextFunction, Request, Response } from "express";
import path from "node:path";
import User from "../models/User.model";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";
import { UserNotFoundExceptionError } from "../../custom.error";
import decodeJWT from "../utils/decodeJWT";
import Sale from "../models/Sale.model";
import GlobalType from "../models/GlobalType.model";
import SaleDetail from "../models/SaleDetail.model";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    const { filename, path: tmpPath } = req.file;
    req.body.tmpPath = tmpPath;
    req.body.uploadPath = path.join(
      userImageUploadOptions.relativePath,
      filename
    );
    req.body.PhotoPath = path.join(userImageUploadOptions.directory, filename);
  }
  try {
    const createdUser = await User.create(req.body);
    if (!createdUser) {
      throw new UserNotFoundExceptionError("User not found!");
    }
    if (req.file) {
      fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      createdUser.PhotoPath = path.join(
        req.protocol + "://" + req.get("host"),
        createdUser.PhotoPath
      );
    }
    // const token = await createdUser.authenticate(req.body.Password);
    return res.status(201).json({
      message: "User created successfully!",
      user: createdUser,
    });
  } catch (error: any) {
    // remove the uploaded file
    if (req.body.tmpPath) {
      fs.unlink(req.body.tmpPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo, Password } = req.body;

  try {
    if (!MobileNo || !Password) {
      throw new Error("MobileNo or Password is missing");
    }

    const user = await User.findOne({
      where: {
        MobileNo: MobileNo,
      },
    });
    if (!user) {
      throw new UserNotFoundExceptionError("User not found!");
    }
    const imageKey = "PhotoPath";
    const imagePath = user?.[imageKey as keyof User];
    if (!imagePath) return;
    const host = req.protocol + "://" + req.get("host");
    const imageFullPath = new URL(path.join(host, imagePath));
    user.setDataValue("PhotoPath", imageFullPath);

    const token = await user?.authenticate(Password);
    res.status(200).json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get user fromtoken
  try {
    let authuser: User;
    if (req.body.user) {
      authuser = req.body.user;
    } else {
      authuser = decodeJWT(req) as User;
    }
    const user = await User.findByPk(authuser.UserGUID, {
      attributes: {
        exclude: ["Password"],
      },
    });

    const imageKey = "PhotoPath";
    const imagePath = user?.[imageKey as keyof User];
    if (!imagePath) return;
    const host = req.protocol + "://" + req.get("host");
    const imageFullPath = new URL(path.join(host, imagePath));
    user.setDataValue("PhotoPath", imageFullPath);

    res.json({
      message: "Current user fetched successfully!",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo, OTP } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    await user.verifyOTP(OTP);
    res.status(200).json({
      message: "User verified successfully!",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};
export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });
    if (!user) {
      throw new UserNotFoundExceptionError("User not found!");
    }
    await user?.sendOTP();
    res.status(200).json({
      message: "OTP sent successfully!",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });

    if (!user) {
      throw new UserNotFoundExceptionError("User not found!");
    }

    await user?.sendOTP();

    res.status(200).json({
      message: "OTP sent successfully!",
    });
  } catch (error: any) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // reset password by verifying OTP
  const { MobileNo, OTP, Password } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    await user.resetPassword(Password, OTP);
    res.status(200).json({
      message: "Password reset successfully!",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};
export const signout = async (req: Request, res: Response) => {
  res.json({
    message: "Signout should be implemented at the Frontend side!",
  });
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const salemasters = await Sale.findAll({
    where: {
      CustomerGUID: req.body.user.UserGUID,
    },
    attributes: {
      exclude: ["CustomerGUID", "SaleTypeRef"],
    },

    include: [
      {
        model: User,
        as: "Customer",
      },
      {
        model: GlobalType,
        as: "SaleTypeRef",

        //  Sale type shoudl be astring value of arributes.GlobaleTypeName
        attributes: {
          include: ["GlobalTypeName"],
          exclude: ["GlobalTypeGUID"],
        },
      },
      {
        model: SaleDetail,
        all: true,
      },
    ],
  });

  salemasters.forEach((sale) => {
    if (sale.SaleTypeRef) {
      sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
      sale.setDataValue("SaleTypeRef", undefined);
    }
  });

  res.json(salemasters);
};
