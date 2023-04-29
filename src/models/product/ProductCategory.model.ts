// [ProductCategoryGUID] [int] IDENTITY(1,1) NOT NULL,
// 	[ProductCategoryName] [varchar](400) NULL,
// 	[IsActive] [bit] NULL,
// 	[CreatedGUID] [int] NULL,
// 	[CreatedDate] [datetime] NULL

import {
  AfterFind,
  AutoIncrement,
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeFind,
  BeforeUpdate,
  BelongsTo,
  BelongsToAssociation,
  BelongsToMany,
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
  VIRTUAL,
  WhereAttributeHashValue,
} from "sequelize";
import ProductAndCategoryMap from "./ProductAndCategoryMap.model";
import ProductMaster from "./ProductMaster.model";

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

  @Column({
    type: DataType.STRING(400),
    allowNull: false,
    field: "ProductCategoryName",
  })
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

  @Column({
    type: DataType.STRING(400),
    allowNull: false,
    field: "ProductCategorySlug",
  })
  ProductCategorySlug!: string;

  @Column
  MenuOrder!: number;

  @Column
  PhotoPath!: string;

  @Column({
    type: DataType.VIRTUAL,
    get(this: ProductCategory) {
      const random = Math.floor(Math.random() * 10) + 1;
      return random;
    },
  })
  NoOfProducts!: number;

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
  @BelongsToMany(
    () => ProductMaster,
    () => ProductAndCategoryMap,
    "ProductCategoryRefGUID",
    "ProductRefGUID"
  )
  products!: ProductMaster[];

  @BeforeBulkCreate
  @BeforeBulkUpdate
  static beforeBulkCreateHook(instances: ProductCategory[]) {
    instances.forEach((instance) => {
      Object.entries(instance.toJSON()).forEach(([key, value]) => {
        if (typeof value === "string") {
          instance.setDataValue(key as keyof ProductCategory, value.trim());
        }
      });
    });
  }

  @BeforeCreate
  @BeforeUpdate
  static beforeCreateHook(instance: ProductCategory) {
    Object.entries(instance.toJSON()).forEach(([key, value]) => {
      if (typeof value === "string") {
        instance.setDataValue(key as keyof ProductCategory, value.trim());
      }
    });
  }
}
