import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import User from "../User.model";
import ProductCategory from "./ProductCategory.model";

@Table({
  tableName: "tbl_ProductSubCategory",
  timestamps: true,
  updatedAt: "ModifiedDate",
  createdAt: "CreatedDate",
  deletedAt: "DeletedDate",
})
export default class ProductSubCategory extends Model<ProductSubCategory> {
  @Column({
    field: "ProductSubCategoryGUID",
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  ProductSubCategoryGUID!: number;

  @BelongsTo(() => ProductCategory, {
    foreignKey: "ProductCategoryGUID",
    targetKey: "ProductCategoryGUID",
    as: "ProductCategory",
  })
  @Column({
    field: "ProductCategoryGUID",
    allowNull: false,
    type: DataType.INTEGER,
    comment: "Product Category GUID",
  })
  ProductCategoryGUID!: number;

  @Column({
    field: "ProductSubCategoryName",
    allowNull: false,
    type: DataType.STRING(100),
    comment: "Product Sub Category Name",
    unique: true,
  })
  ProductSubCategoryName!: string;

  @Column({
    field: "IsActive",
    allowNull: false,
    type: DataType.BOOLEAN,
    comment: "Is Active",
    defaultValue: 1,
  })
  IsActive!: number;

  @Column({
    field: "CreatedDate",
    allowNull: false,
    type: DataType.DATE,
  })
  CreatedDate!: Date;

  @Column({
    field: "ModifiedDate",
    allowNull: true,
    type: DataType.DATE,
  })
  ModifiedDate!: Date;

  @Column({
    field: "DeletedDate",
    allowNull: true,
    type: DataType.DATE,
  })
  DeletedDate!: Date;

  @BelongsTo(() => User, {
    foreignKey: "CreatedGUID",
    targetKey: "UserGUID",
    as: "CreatedUser",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  CreatedGUID!: number;

  @BelongsTo(() => User, {
    foreignKey: "ModifiedGUID",
    targetKey: "UserGUID",
    as: "ModifiedUser",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  ModifiedGUID!: number;

  @BelongsTo(() => User, {
    foreignKey: "DeletedGUID",
    targetKey: "UserGUID",
    as: "DeletedUser",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    references: {
      model: "User",
      key: "UserGUID",
    },
  })
  DeletedGUID!: number;
}
