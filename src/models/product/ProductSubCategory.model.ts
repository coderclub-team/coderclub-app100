// [ProductSubCategoryGUID] [int] IDENTITY(1,1) NOT NULL,
// 	[ProductCategoryGUID] [int] NULL,
// 	[ProductSubCategoryName] [varchar](400) NULL,
// 	[IsActive] [bit] NULL,
// 	[CreatedGUID] [int] NULL,
// 	[CreatedDate] [datetime] NULL

import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import ProductCategory from "./ProductCategory.model";

@Table({
  tableName: "tbl_ProductSubCategory",
  timestamps: true,
  updatedAt: false,
})
export default class ProductSubCategory extends Model {
  @Column({
    field: "ProductSubCategoryGUID",
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  ProductSubCategoryGUID!: number;

  @BelongsTo(() => ProductCategory, {
    foreignKey: "ProductCategoryGUID",
    targetKey: "ProductCategoryGUID",
    as: "ProductCategory",
  })
  @Column({
    field: "ProductCategoryGUID",
    allowNull: false,
    type: DataType.INTEGER,
    comment: "Product Category GUID",
  })
  ProductCategoryGUID!: number;

  @Column({
    field: "ProductSubCategoryName",
    allowNull: false,
    type: DataType.STRING(100),
    comment: "Product Sub Category Name",
    unique: true,
  })
  ProductSubCategoryName!: string;

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
    type: DataType.DATE,
    comment: "Created Date",
  })
  CreatedDate!: Date;
}
