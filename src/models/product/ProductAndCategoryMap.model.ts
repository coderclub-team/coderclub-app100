import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductCategory from "./ProductCategory.model";
import ProductMaster from "./ProductMaster.model";

@Table({
  tableName: "tbl_ProductAndCategoryMap",
  paranoid: false,
  timestamps: false,
})
export default class ProductAndCategoryMap extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  ProductAndCategoryMapGUID!: number;

  @BelongsTo(() => ProductCategory, {
    foreignKey: "ProductCategoryRefGUID",
    targetKey: "ProductCategoryGUID",
    as: "ProductCategory",
  })
  ProductCategoryRefGUID!: number;

  @BelongsTo(() => ProductMaster, {
    foreignKey: "ProductRefGUID",
    targetKey: "ProductGUID",
    as: "Product",
  })
  ProductRefGUID!: number;

  // IsActive!: boolean;
  // CreatedDate!: Date;
  // ModifiedDate!: Date;
  // DeletedDate!: Date;
  // CreatedGUID!: number;
  // ModifiedGUID!: number;
  // DeletedGUID!: number;
}
