import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import GlobalType from "./GlobalType.model";
import { sequelize } from "../database";
import User from "./User.model";
import SaleDetail from "./SaleDetail.model";

@Table({
  tableName: "tbl_SalesMaster",
  timestamps: false,
  createdAt: "CreatedDate",
  updatedAt: false,
  deletedAt: false,
  paranoid: false,
})
export default class Sale extends Model<Sale> {
  @PrimaryKey
  @Column
  SalesMasterGUID!: number;

  @Column
  SaleOrderID!: string;
  @Column
  SaleOrderDate!: Date;

  @ForeignKey(() => GlobalType)
  @Column({
    type: DataType.VIRTUAL,
    field: "SaleType",
  })
  SaleType!: string;

  @BelongsTo(() => GlobalType)
  SaleTypeRef?: GlobalType;

  @Column
  PaymentMode!: number;
  @Column
  SalemanGUID!: number;
  @Column
  LinemanGUID!: number;
  @Column
  StoreGUID!: number;
  @Column
  CreatedGUID!: number;
  @Column
  CreatedDate!: Date;

  @ForeignKey(() => User)
  @Column
  CustomerGUID!: number;

  @BelongsTo(() => User)
  Customer!: User;

  @HasMany(() => SaleDetail, {
    foreignKey: "SalesMasterGUID",
    as: "SaleDetails",
  })
  SaleDetails!: SaleDetail[];
}
