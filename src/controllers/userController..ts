import { NextFunction, Request, Response } from "express";
import User from "../models/User.model";
import path from "node:path";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";
import decodeJWT from "../utils/decodeJWT";
import UserAddress from "../models/UserAddress.model";

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
      include: [UserAddress],
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
      include: [UserAddress],
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

    Object.keys(req.body).forEach((key: string) => {
      if (user) {
        user.setDataValue(key, req.body[key]);
      }
    });

    if (req.body.tmpPath && req.body.uploadPath) {
      fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
        if (err) console.log(err);
        else {
          const baseUrl = `${req.protocol}://${req.get("host")}`;
          user?.setDataValue(
            "PhotoPath",
            new URL(path.join(baseUrl, user!.PhotoPath))
          );
        }
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
    await user.save();
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

// Manage user addresses

// export const getAllAddresses = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.body.user) {
//     req.body.CreatedGUID = req.body.user.UserGUID;
//   } else {
//     req.body.CreatedGUID = decodeJWT(req).UserGUID;
//   }
// };
export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }
  req.body.UserGUID = req.body.CreatedGUID;
  try {
    const address = await UserAddress.create(req.body);
    res.send({
      message: "User address added successfully!",
      address,
    });
  } catch (error) {
    next(error);
  }
};
export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  try {
    if (!req.body.UserAddressGUID)
      throw Error("AddressGUID is required to update the Address!");

    const address = await UserAddress.findByPk(req.body.UserAddressGUID);
    if (!address) throw Error("Invalid AddressGUID!");
    delete req.body.UserAddressGUID;
    const useraddress = await address.update(req.body);
    res.status(200).send({
      message: "User addredd updated successfully!",
      useraddress,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  try {
    if (!req.body.UserAddressGUID)
      throw Error("AddressGUID is required to delete the Address!");
    const address = await UserAddress.findByPk(req.body.UserAddressGUID);
    if (!address) throw Error("Invalid AddressGUID!");
    await address.destroy();
    res.status(200).send({
      message: "User address deleted successfully!",
      address,
    });
  } catch (error) {
    next(error);
  }
};
