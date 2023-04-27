// [ProductCategoryGUID] [int] IDENTITY(1,1) NOT NULL,
// 	[ProductCategoryName] [varchar](400) NULL,
// 	[IsActive] [bit] NULL,
// 	[CreatedGUID] [int] NULL,
// 	[CreatedDate] [datetime] NULL

import {
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Validate,
} from "sequelize-typescript";
import ProductSubCategory from "./ProductSubCategory.model";
import {
  Op,
  Sequelize,
  SequelizeScopeError,
  UniqueConstraintError,
  WhereAttributeHashValue,
} from "sequelize";

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

  @ForeignKey(() => ProductCategory)
  @BelongsTo(() => ProductCategory, {
    foreignKey: "ParentCategoryRefGUID",
    targetKey: "ProductCategoryGUID",
    as: "ParentCategory",
  })
  @Column
  ParentCategoryRefGUID!: number;

  @Column
  IsActive!: number;

  // check if the category name already exists before create

  @BeforeCreate
  static async checkIfCategoryExists(instance: ProductCategory) {
    const count = await ProductCategory.count({
      where: {
        ProductCategoryName: instance.ProductCategoryName,
        ParentCategoryRefGUID:
          null as unknown as WhereAttributeHashValue<number>,
      },
    });
    if (count) {
      throw new Error("Category already exists");
    }
  }
}
