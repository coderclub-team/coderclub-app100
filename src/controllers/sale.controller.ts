import { Request, Response } from "express";

import SaleDetail from "../models/sale-detail.model";
import Sale from "../models/sale.model";
import GlobalType from "../models/global-type.model";
import { Sequelize } from "sequelize";
import User from "../models/user.model";

export async function getAllSales(req: Request, res: Response) {
  const salemasters = await Sale.findAll({
    attributes: {
      exclude: ["CustomerGUID", "SaleTypeRef"],
    },

    include: [
      {
        model: User,
        as: "Customer",
      },
      {
        model: GlobalType,
        as: "SaleTypeRef",

        //  Sale type shoudl be astring value of arributes.GlobaleTypeName
        attributes: {
          include: ["GlobalTypeName"],
          exclude: ["GlobalTypeGUID"],
        },
      },
      {
        model: SaleDetail,
        all: true,
      },
    ],
  });

  salemasters.forEach((sale) => {
    if (sale.SaleTypeRef) {
      sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
      sale.setDataValue("SaleTypeRef", undefined);
    }
  });

  res.status(200).json(salemasters);
}

export async function getSaleById(req: Request, res: Response) {
  const { SalemanGUID } = req.params;
  const sale = await Sale.findOne({
    where: {
      SalemanGUID:SalemanGUID,
    },
    include: [
      {
        model: User,
        as: "Customer",
      },
      {
        model: GlobalType,
        as: "SaleTypeRef",

        //  Sale type shoudl be astring value of arributes.GlobaleTypeName
        attributes: {
          include: ["GlobalTypeName"],
          exclude: ["GlobalTypeGUID"],
        },
      },
      {
        model: SaleDetail,
        all: true,
      },
    ],
  });

  if (!sale) {
    return res.status(404).json({
      message: "Sale not found",
    });
  }

  if (sale.SaleTypeRef) {
    sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
    sale.setDataValue("SaleTypeRef", undefined);
  }

  res.status(200).json(sale);
}
