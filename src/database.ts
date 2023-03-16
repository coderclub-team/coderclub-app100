import { Sequelize } from "sequelize-typescript";
import { sequelizeConnectionOptions } from "../config";
import Employee from "./models/Employee.model";
import { GlobalType } from "./models/GlobalType.model";
import LineMan from "./models/LineMan.model";

import ProductCategory from "./models/product/ProductCategory.model";
import ProductMaster from "./models/product/ProductMaster.model";
import ProductSubCategory from "./models/product/ProductSubCategory.model";
import StoreMaster from "./models/StoreMaster.model";

import User from "./models/User.model";

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
    Employee,
    ProductCategory,
    ProductSubCategory,
    ProductMaster,
    StoreMaster,
    LineMan,
    GlobalType,
  ]);
  User.sync();
  Employee.sync();
  ProductCategory.sync();
  ProductSubCategory.sync();
  ProductMaster.sync();
  StoreMaster.sync();
  LineMan.sync();
  GlobalType.sync();

  return sequelize;
};
