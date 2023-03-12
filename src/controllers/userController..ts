import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import path from "node:path";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";

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
    return res.status(500).json(error);
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
    return res.status(500).json(error);
  }
};
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userGUID } = req.params;

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
    const user = await User.findByPk(userGUID);
    if (!user) return res.status(400).json({ message: "User not found!" });

    const oldPhotoPath = user.PhotoPath;
    await user.update(req.body);

    if (req.body.tmpPath && req.body.uploadPath) {
      fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
        if (err) console.log(err);
        else
          user.PhotoPath = path.join(
            req.protocol + "://" + req.get("host"),
            user.PhotoPath
          );
      });
    }

    if (oldPhotoPath && oldPhotoPath !== user.PhotoPath) {
      fs.unlink(
        path.join(
          userImageUploadOptions.relativePath,
          path.basename(oldPhotoPath)
        ),
        (err) => {
          if (err) console.log(err);
          else console.log("Old photo deleted successfully!");
        }
      );
    }

    return res
      .status(201)
      .json({ message: "User updated successfully!", user: user });
  } catch (error) {
    next(error);
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
    return res.status(500).json(error);
  }
};
