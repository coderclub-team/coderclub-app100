// USE [GKDairy]
// GO

import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "tbl_LineMan",
  timestamps: true,
  createdAt: "CreateGUID",
  updatedAt: "ModifiedGUID",
  deletedAt: "DeletedGUID",
})
export default class LineMan extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public LineManGUID!: number;
  public LineManID!: string;
  public LineManName!: string;
  public Address!: string;
  public City!: string;
  public State!: string;
  public PinCode!: string;
  public MobileNo!: string;
  public ShopID!: string;
  public StoreGUID!: number;
  public CreatedGUID!: number;
  public CreatedDate!: Date;
  public ModifiedGUID!: number;
  public DeletedGUID!: number;
  public ModifiedDate!: Date;
  public DeletedDate!: Date;
}
