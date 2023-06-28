import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import path from "node:path";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";

export const getAllUsers = async (req: Request, res: Response) => {
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;

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
      paranoid,
    });
    users.forEach((user) => {
      const imageKey = "PhotoPath";
      const imagePath = user?.[imageKey as keyof User];
      if (!imagePath) return;
      const host = req.protocol + "://" + req.get("host");
      const imageFullPath = new URL(path.join(host, imagePath));
      user.setDataValue("PhotoPath", imageFullPath);
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { UserGUID } = req.params;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        UserGUID,
      },
      paranoid,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    const imageKey = "PhotoPath";
    const imagePath = user?.[imageKey as keyof User];
    if (!imagePath) return;
    const host = req.protocol + "://" + req.get("host");
    const imageFullPath = new URL(path.join(host, imagePath));
    user.setDataValue("PhotoPath", imageFullPath);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { UserGUID } = req.params;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;

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
    let user = await User.findByPk(UserGUID, {
      paranoid,
    });
    if (user && user.DeletedDate && !paranoid) {
      await user.restore();
      // user.DeletedDate = null;
    } else if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const oldPhotoPath = user.PhotoPath;

    delete req.body.MobileNo;
    delete req.body.Password;

    await user.save(req.body);

    if (req.body.tmpPath && req.body.uploadPath) {
      fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
        if (err) console.log(err);
        else
          user!.PhotoPath = path.join(
            req.protocol + "://" + req.get("host"),
            user!.PhotoPath
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

    res.status(201).json({ message: "User updated successfully!", user: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { deleted } = req.query;
  const { UserGUID } = req.params;
  const paranoid = deleted === "true" ? false : true;

  try {
    const user = await User.findOne({
      where: {
        UserGUID,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    await user.destroy({
      force: !paranoid,
    });

    return res.status(200).json({
      message: "User deleted successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
