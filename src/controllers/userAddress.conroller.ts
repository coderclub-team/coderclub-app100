import { NextFunction, Request, Response } from "express";
import UserAddress from "../models/UserAddress.model";
import decodeJWT from "../utils/decodeJWT";

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
    const address = await UserAddress.findByPk(req.params.AddressGUID);
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
    const address = await UserAddress.findByPk(req.params.AddressGUID);
    if (!address) throw Error("Invalid AddressGUID!");
    await address.destroy();
    res.status(200).send({
      message: "User address deleted successfully!",
      params: req.params,
      address,
    });
  } catch (error) {
    next(error);
  }
};
