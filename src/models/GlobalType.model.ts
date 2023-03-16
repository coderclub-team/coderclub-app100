import { Model, Table, Column } from "sequelize-typescript";

@Table({
  tableName: "tbl_GlobalType",
  timestamps: true,
  paranoid: false,
  createdAt: "CreatedDate",
  updatedAt: false,
  deletedAt: false,
})
export class GlobalType extends Model {
  @Column({})
  GlobalTypeGUID!: number;
  @Column({})
  GlobalTypeName!: string;
  @Column({})
  Description!: string;
  @Column({})
  GlobalTypeCategoryGUID!: number;
  @Column({})
  CreatedGUID!: number;
  @Column({})
  CreatedDate!: Date;
  @Column({})
  IsActive!: number;
}
