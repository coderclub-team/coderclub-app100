// a auth controller to handle login and register

// src/controllers/authController.ts

import { Request, Response } from "express";
import {
  DatabaseError,
  UniqueConstraintError,
  ValidationError,
} from "sequelize";

import User from "../models/User.model";

import { generateToken } from "../utils/auth";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user);
    user.set("Password", null);
    return res.status(200).json({
      message: "Registration successful!",
      token,
      user,
    });
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        message: "User already exists!",
        error,
      });
    } else if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
        error,
      });
    } else if (error instanceof DatabaseError) {
      return res.status(400).json({
        message: error.message,
        error,
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
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
    const user = await User.findByPk(MobileNo, {
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
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// signout a user and invalidate the token

export const signout = async (req: Request, res: Response) => {
  res.json({
    message: "Signout should be implemented at the Frontend side!",
  });
};
