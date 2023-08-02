import {
  AutoIncrement,
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
  timestamps: true,
  createdAt: "CreatedDate",
  updatedAt: "UpdatedDate",
  deletedAt: "DeletedDate",
  paranoid: true,
})
export default class Sale extends Model{
  @PrimaryKey
  @AutoIncrement
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

  @Column
  UpdatedDate!: Date;

  @Column
  DeletedDate!: Date;


  // @BelongsTo(() => User)
  // Customer!: User;

  @HasMany(() => SaleDetail, {
    foreignKey: "SalesMasterGUID",
    as: "SaleDetails",
  })
  SaleDetails!: SaleDetail[];
}
