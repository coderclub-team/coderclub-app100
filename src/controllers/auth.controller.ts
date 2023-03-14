import { NextFunction, Request, Response } from "express";
import path from "node:path";
import User from "../models/User.model";
import { generateToken } from "../utils/auth";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";
import multer, { MulterError } from "multer";
import { convertToObject } from "typescript";
import { UserNotFoundExceptionError } from "../../custom.error";
import generateOTP from "../utils/generateOTP";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { OTP, OtpExpiryDate } = generateOTP();
  req.body.OTP = OTP;
  req.body.OtpExpiryDate = OtpExpiryDate;
  if (req.file) {
    // move the file to the uploads directory
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

    const token = generateToken(createdUser);
    return res.status(201).json({
      message: "User created successfully!",
      token,
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

export const login = async (req: Request, res: Response) => {
  const { MobileNo, Password } = req.body;

  if (!MobileNo || !Password) {
    return res.status(400).json({
      message: "MobileNo and password are required!",
    });
  }

  try {
    // Status ==1 means user is active
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      attributes: {
        exclude: [
          "OTP",
          "AuthID",
          "Logouttime",
          "ModifiedDate",
          "DeletedDate",
          "CreatedDate",
          "ModifiedGUID",
          "CreatedGUID",
          "DeletedGUID",
        ],
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    } else if (user.Status == 0) {
      return res.status(400).json({
        message: "User is not verified!",
      });
    }

    const isValidPassword = await user.comparePassword(Password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid password!",
      });
    }
    user.set("Password", null);
    if (user.PhotoPath)
      user.PhotoPath = path.join(
        req.protocol.toString() + "://" + req.get("host"),
        user.PhotoPath
      );

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful!",
      token,
      user,
    });
  } catch (error: any) {
    console.log("error===", error);
    return res.status(500).json(error);
  }

  // } catch (error: any) {
  //   return res.status(500).json(error);
  // }
};

export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo, OTP } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  const currentDate = new Date();
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
    } else if (!user.OTP) {
      return res.status(400).json({
        message: "OTP is not generated!",
      });
    } else if (user.OTP !== OTP) {
      return res.status(400).json({
        message: "Invalid OTP!",
      });
    } else if (!user.OtpExpiryDate) {
      return res.status(400).json({
        message: "OTP is not generated!",
      });
    } else if (user.OtpExpiryDate < currentDate) {
      return res.status(400).json({
        message: "OTP is expired!",
      });
    } else if (user.Status === 1) {
      return res.status(400).json({
        message: "User is already verified!",
      });
    }

    user.set("OTP", null);
    user.set("Status", 1);
    await user.save();

    res.status(200).json({
      message: "User verified successfully!",
      user,
    });
  } catch (error: any) {
    console.log("error===", error.message);
    next(error);
  }
};

export const resendOTP = async (
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
    console.log("user.Status===", user!.Status);
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    if (user!.Status) {
      console.log("user.Status===", user.Status);
      return res.status(400).json({
        message: "User is already verified!",
      });
    }

    const { OTP, OtpExpiryDate } = generateOTP();
    user.set("OTP", OTP);
    user.set("OtpExpiryDate", OtpExpiryDate);
    await user.save();

    res.status(200).json({
      message: "OTP sent successfully!",
      user,
    });
  } catch (error: any) {
    console.log("error===", error.message);
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
  const currentDate = new Date();
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
    } else if (!user.OTP) {
      return res.status(400).json({
        message: "OTP is not generated!",
      });
    } else if (user.OTP !== OTP) {
      return res.status(400).json({
        message: "Invalid OTP!",
      });
    } else if (!user.OtpExpiryDate) {
      return res.status(400).json({
        message: "OTP is not generated!",
      });
    } else if (user.OtpExpiryDate < currentDate) {
      return res.status(400).json({
        message: "OTP is expired!",
      });
    }

    user.set("Password", Password);
    user.set("OTP", null);
    user.set("OtpExpiryDate", null);
    await user.save();

    res.status(200).json({
      message: "Password reset successfully!",
      user,
    });
  } catch (error: any) {
    console.log("error===", error.message);
    next(error);
  }
};

export const signout = async (req: Request, res: Response) => {
  res.json({
    message: "Signout should be implemented at the Frontend side!",
  });
};
