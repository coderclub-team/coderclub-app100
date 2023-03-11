// [ProductCategoryGUID] [int] IDENTITY(1,1) NOT NULL,
// 	[ProductCategoryName] [varchar](400) NULL,
// 	[IsActive] [bit] NULL,
// 	[CreatedGUID] [int] NULL,
// 	[CreatedDate] [datetime] NULL

import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import ProductSubCategory from "./ProductSubCategory.model";

// Path: src/models/ProductCategory.ts

@Table({
  tableName: "tbl_ProductCategory",
  timestamps: true,
  updatedAt: false,
})
export default class ProductCategory extends Model {
  @Column({
    field: "ProductCategoryGUID",
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  ProductCategoryGUID!: number;

  @Column({
    field: "ProductCategoryName",
    allowNull: false,
    type: DataType.STRING(100),
    comment: "Product Category Name",
    unique: true,
  })
  ProductCategoryName!: string;

  @Column({
    field: "IsActive",
    allowNull: false,
    type: DataType.TINYINT,
    comment: "Is Active",
    defaultValue: 1,
  })
  IsActive!: boolean;

  @Column({
    field: "CreatedGUID",
    allowNull: false,
    type: DataType.INTEGER,
    comment: "Created GUID",
    // references: {
    //   model: "User",
    //   key: "UserGUID",
    // },
  })
  CreatedGUID!: number;

  @CreatedAt
  @Column({
    field: "CreatedDate",
    allowNull: false,
    type: DataType.DATEONLY,
    comment: "Created Date",
  })
  CreatedDate!: Date;

  @HasMany(() => ProductSubCategory, {
    foreignKey: "ProductCategoryGUID",
    sourceKey: "ProductCategoryGUID",
    as: "ProductSubCategories",
  })
  ProductSubCategory!: ProductSubCategory[];
}
