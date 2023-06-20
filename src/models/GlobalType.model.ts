import {
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Model,
  HasMany,
} from "sequelize-typescript";
import Sale from "./Sale.model";

@Table({
  tableName: "tbl_GlobalType",
  timestamps: true,
  paranoid: false,
  createdAt: "CreatedDate",
  updatedAt: false,
  deletedAt: false,
})
export default class GlobalType extends Model<GlobalType> {
  @PrimaryKey
  @Column
  GlobalTypeGUID!: number;
  @Column
  GlobalTypeName!: string;
  @Column
  Description!: string;
  @Column
  GlobalTypeCategoryGUID!: number;
  @Column
  CreatedGUID!: number;
  @Column
  CreatedDate!: Date;
  @Column
  IsActive!: number;
}
