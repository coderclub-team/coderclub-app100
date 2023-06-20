import { Request, Response } from "express";

import SaleDetail from "../models/SaleDetail.model";
import Sale from "../models/Sale.model";
import GlobalType from "../models/GlobalType.model";
import { Sequelize } from "sequelize";
import User from "../models/User.model";

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
