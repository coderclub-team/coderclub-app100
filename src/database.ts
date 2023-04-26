import { Sequelize } from "sequelize-typescript";
import { sequelizeConnectionOptions } from "../config";
import ProductMaster from "./models/product/ProductMaster.model";
import User from "./models/User.model";
import ProductCategory from "./models/product/ProductCategory.model";
import ProductSubCategory from "./models/product/ProductSubCategory.model";
import ProductCategoryMapping from "./models/product/ProductCategoryMapping.model";
import { ProductVariant } from "./models/product/ProductVariant.model";

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
    ProductMaster,
    ProductCategory,
    ProductSubCategory,
    ProductCategoryMapping,
    ProductVariant,
  ]);
  User.sync();
  ProductMaster.sync();
  ProductCategory.sync();
  ProductSubCategory.sync();
  ProductCategoryMapping.sync();
  ProductVariant.sync();

  return sequelize;
};
