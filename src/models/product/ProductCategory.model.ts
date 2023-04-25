// [ProductCategoryGUID] [int] IDENTITY(1,1) NOT NULL,
// 	[ProductCategoryName] [varchar](400) NULL,
// 	[IsActive] [bit] NULL,
// 	[CreatedGUID] [int] NULL,
// 	[CreatedDate] [datetime] NULL

import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductSubCategory from "./ProductSubCategory.model";

// Path: src/models/ProductCategory.ts

@Table({
  tableName: "tbl_ProductCategory",
  paranoid: true,
  timestamps: true,
  updatedAt: "ModifiedDate",
  createdAt: "CreatedDate",
  deletedAt: "DeletedDate",
})
export default class ProductCategory extends Model {
  @PrimaryKey
  @Column
  ProductCategoryGUID!: number;
  @Column
  ProductCategoryName!: string;
  ParentCategoryRefGUID!: number;
  IsActive!: boolean;
  CreatedDate!: Date;
  ModifiedDate!: Date;
  DeletedDate!: Date;
  CreatedGUID!: number;
  ModifiedGUID!: number;
  DeletedGUID!: number;
}
