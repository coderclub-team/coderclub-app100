import {
  AutoIncrement,
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
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

  @Column({
    type: DataType.STRING(400),
    allowNull: false,
    field: "ProductCategoryName",
  })
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

  @Column({
    type: DataType.VIRTUAL,
    get() {
      return this.getDataValue("ProductCount");
    },
  })
  ProductCount!: number;

  // check if the category name already exists before create

  // @BeforeCreate
  // static async checkIfCategoryExists(instance: ProductCategory) {
  //   const count = await ProductCategory.count({
  //     where: {
  //       ProductCategoryName: instance.ProductCategoryName,
  //       ParentCategoryRefGUID:
  //         null as unknown as WhereAttributeHashValue<number>,
  //     },
  //   });
  //   if (count) {
  //     throw new Error("Category already exists");
  //   }
  // }

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
