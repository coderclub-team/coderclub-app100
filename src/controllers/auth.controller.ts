import { NextFunction, Request, Response } from "express";
import path from "node:path";
import User from "../models/User.model";
import { generateToken } from "../utils/auth";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    // if (req.body.tmpPath) {
    //   fs.unlink(req.body.tmpPath, (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    // }

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
    }

    const isValidPassword = await user.comparePassword(Password);
    user.set("Password", null);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid password!",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful!",
      token,
      user,
    });
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

// signout a user and invalidate the token

export const signout = async (req: Request, res: Response) => {
  res.json({
    message: "Signout should be implemented at the Frontend side!",
  });
};
