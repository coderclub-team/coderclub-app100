// AttributeValue
// AttributeName
// ProductRefGUID
// ProductAttributeGUID

import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductMaster from "./ProductMaster.model";
@Table({
  tableName: "tbl_ProductAttribute",
  timestamps: false,
})
export class ProductAttribute extends Model<ProductAttribute> {
  @PrimaryKey
  @AutoIncrement
  @Column
  ProductAttributeGUID!: number;
  @Column
  AttributeName!: string;
  @Column
  AttributeValue!: string;

  @ForeignKey(() => ProductMaster)
  @Column
  ProductRefGUID!: number;
}
