import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "tbl_ProductCategoryMapping",
  paranoid: true,
  timestamps: true,
  updatedAt: "ModifiedDate",
  createdAt: "CreatedDate",
  deletedAt: "DeletedDate",
})
export default class ProductCategoryMapping extends Model {
  @PrimaryKey
  @Column
  ProductCategoryMappingGUID!: number;
  @Column
  ProductCategoryGUID!: number;
  @Column
  ProductSubCategoryGUID!: number;
  @Column
  ProductGUID!: number;

  IsActive!: boolean;
  CreatedDate!: Date;
  ModifiedDate!: Date;
  DeletedDate!: Date;
  CreatedGUID!: number;
  ModifiedGUID!: number;
  DeletedGUID!: number;
}
