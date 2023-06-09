import { Sequelize } from "sequelize-typescript";
import { sequelizeConnectionOptions } from "../config";
import ProductMaster from "./models/product/ProductMaster.model";
import User from "./models/User.model";

import ProductCategory from "./models/product/ProductCategory.model";
import ProductSubCategory from "./models/product/ProductSubCategory.model";
import Sale from "./models/Sale.model";
import SaleDetail from "./models/SaleDetail.model";
import GlobalType from "./models/GlobalType.model";
import GlobalTypeCategory from "./models/GlobalTypeCategory.nodel";

export const sequelize = new Sequelize(sequelizeConnectionOptions);

export default async () => {
  sequelize
    .authenticate({
      logging: console.log,
      plain: true,
      raw: true,
    })
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  sequelize.addModels([
    User,
    ProductCategory,
    ProductSubCategory,
    ProductMaster,
    GlobalTypeCategory,
    GlobalType,

    Sale,
    SaleDetail,
  ]);
  User.sync();
  ProductCategory.sync();
  GlobalTypeCategory.sync();
  GlobalType.sync();
  ProductSubCategory.sync();
  ProductMaster.sync();

  Sale.sync({
    schema: "dbo",
  });
  SaleDetail.sync();

  return sequelize;
};
