import { NextFunction, Request, Response } from "express";
import Customer from "../models/customer.model";

export const all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};
