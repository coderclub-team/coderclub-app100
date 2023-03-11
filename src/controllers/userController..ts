import { Request, Response } from "express";
import User from "../models/User.model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: [
          "CreatedGUID",
          "ModifiedGUID",
          "CreatedDate",
          "ModifiedDate",
          "DeletedDate",
        ],
      },
    });

    return res.status(200).json({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { MobileNo } = req.params;
  try {
    const user = await User.findByPk(MobileNo, {
      attributes: {
        exclude: [
          "CreatedGUID",
          "ModifiedGUID",
          "CreatedDate",
          "ModifiedDate",
          "DeletedDate",
        ],
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
export const updateUserById = async (req: Request, res: Response) => {
  const { MobileNo } = req.params;
  const { Password } = req.body;
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      Password
    )
  ) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    });
  }

  try {
    const user = await User.findByPk(MobileNo, {
      attributes: {
        exclude: [
          "CreatedGUID",
          "ModifiedGUID",
          "CreatedDate",
          "ModifiedDate",
          "DeletedDate",
        ],
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    req.body.ModifiedGUID = req.body.user.UserGUID;

    await user.update(req.body, {
      exclude: ["UserGUID", "CreatedGUID", "MobileNo"],
    });

    return res.status(200).json({
      message: "User updated successfully!",
      user,
    });
  } catch (error: any) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        msg: error.errors.map((e: any) => e.message),
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { MobileNo } = req.params;

  try {
    const user = await User.findByPk(MobileNo, {
      attributes: {
        exclude: ["DeletedGUID", "ModifiedGUID", "CreatedDate", "ModifiedDate"],
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "User deleted successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
