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
  tableName: "tbl_ProductVariant",
  timestamps: true,
  paranoid: false,
  createdAt: "CreatedDate",
  updatedAt: "ModifiedDate",
  deletedAt: "DeletedDate",
})
export class ProductVariant extends Model<ProductVariant> {
  @PrimaryKey
  @AutoIncrement
  @Column
  ProductVariantGUID!: number;
  @Column
  Unit_Price!: number;
  @Column
  MRP!: number;
  @Column
  GST!: number;
  @Column
  Qty!: number;
  @Column
  UnitsInStock!: number;
  @Column
  IsActive!: boolean;
  @Column
  SKU!: string;
  @Column
  UOM!: string;
  @Column
  Weight!: number;
  @Column
  Length!: number;
  @Column
  Width!: number;
  @Column
  Height!: number;
  @Column
  SaleRate!: number;

  @ForeignKey(() => ProductMaster)
  @Column
  ProductMasterRefGUID!: number;

  @Column
  Size!: string;

  @Column
  Color!: string;

  @Column
  Flavour!: string;

  @Column
  CreatedGUID!: number;

  //   ProductAttributeRefGUID!: number;
}
