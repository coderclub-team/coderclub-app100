import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Sale from "./Sale.model";

@Table({
  tableName: "tbl_SalesDetails",
  timestamps: false,
  paranoid: false,
})
export default class SaleDetail extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    autoIncrementIdentity: true,
  })
  SalesDetailGUID!: number;

  @ForeignKey(() => Sale)
  @Column
  SalesMasterGUID!: number;

  @BelongsTo(() => Sale)
  SalesMasterRef?: Sale;

  @Column
  ProductGUID!: number;

  @Column
  ProductName!: string;

  @Column
  ProductCode!: string;
  @Column
  Qty!: number;
  @Column
  MRP!: number;
  @Column
  SaleRate!: number;
  @Column
  SGST!: number;
  @Column
  CGST!: number;
  @Column
  DiscountPercent!: number;
  @Column
  DiscAmt!: number;
  @Column
  TaxAmount!: number;
  @Column
  Amount!: number;
  @Column
  CreatedGUID!: number;
  @Column
  CreatedDate!: Date;
}

// EXEC sp_help tbl_SalesDetails

// SalesDetailGUID
// SalesMasterGUID
// ProductGUID
// ProductCode
// Qty
// MRP
// SaleRate
// SGST
// CGST
// DiscountPercent
// DiscAmt
// TaxAmount
// Amount
// CreatedGUID
// CreatedDate
