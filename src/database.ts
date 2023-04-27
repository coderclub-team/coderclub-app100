import { Sequelize } from "sequelize-typescript";
import { sequelizeConnectionOptions } from "../config";
import ProductMaster from "./models/product/ProductMaster.model";
import User from "./models/User.model";
import ProductCategory from "./models/product/ProductCategory.model";
import ProductSubCategory from "./models/product/ProductSubCategory.model";
import { ProductVariant } from "./models/product/ProductVariant.model";
import { ProductAttribute } from "./models/product/ProductAttribute.model";
import ProductAndCategoryMap from "./models/product/ProductAndCategoryMap.model";

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
    ProductVariant,
    ProductAttribute,
    ProductAndCategoryMap,
  ]);
  User.sync();
  ProductMaster.sync();
  ProductCategory.sync();
  ProductSubCategory.sync();
  ProductVariant.sync();
  ProductAttribute.sync();
  ProductAndCategoryMap.sync();

  return sequelize;
};
