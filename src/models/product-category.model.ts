import { Request } from "express";
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
// Path: src/models/ProductCategory.ts

@Table({
  tableName: "tbl_ProductCategory",
  paranoid: false,
  timestamps: false,
})
export default class ProductCategory extends Model<ProductCategory> {
  @PrimaryKey
  @AutoIncrement
  @Column
  ProductCategoryGUID!: number;

  @Column
  ProductCategoryName!: string;

  @Column
  IsActive!: number;

  @Column
  SortOrder!: number;

  @Column
  PhotoPath!: string;

  @Column
  ProductCategoryDescription!: string;

  @Column
  ProductCategorySlug!: string;


  setFullURL(request: Request,key: keyof ProductCategory) {
    const hostname= request.protocol + "://" + request.get("host")
    const originalPath= this.getDataValue(key) || "identities/product-identity.png"
    if(!originalPath) return;
     const fullPath = `${hostname}/${originalPath}`;
     this.setDataValue(key, fullPath);
   }
}
