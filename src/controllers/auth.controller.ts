import { NextFunction, Request, Response } from "express";
import path from "node:path";
import User from "../models/User.model";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";
import { UserNotFoundExceptionError } from "../../custom.error";
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
    const token = await createdUser.authenticate(req.body.Password);
    return res.status(201).json({
      message: "User created successfully!",
      user: createdUser,
      token: token,
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
    const user = await User.findOne({
      where: {
        MobileNo: MobileNo,
      },
    });
    if (!user) {
      throw new UserNotFoundExceptionError("User not found!");
    }
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
