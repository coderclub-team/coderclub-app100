import { DataTypes } from "sequelize";
import {
  AllowNull,
  Association,
  BelongsTo,
  Column,
  DeletedAt,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import ProductCategory from "./ProductCategory.model";
import ProductSubCategory from "./ProductSubCategory.model";

@Table({
  tableName: "tbl_ProductMaster",
  timestamps: true,
  paranoid: true,
  createdAt: "CreatedDate",
  updatedAt: "ModifiedDate",
  deletedAt: "DeletedDate",
})
export default class ProductMaster extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: "ProductGUID",
  })
  ProductGUID!: number;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(200),
    unique: true,
    comment: "ProductID",
  })
  ProductID!: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
    comment: "ProductName",
  })
  ProductName!: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(200),
    comment: "ProductCode",
  })
  ProductCode!: string;

  @BelongsTo(() => ProductCategory, {
    foreignKey: "ProductCategoryGUID",
    targetKey: "ProductCategoryGUID",
    as: "ProductCategory",
  })
  @Column({
    allowNull: true,
    type: DataTypes.INTEGER,
    comment: "ProductCategoryGUID",
  })
  ProductCategoryGUID!: number;

  @BelongsTo(() => ProductSubCategory, {
    foreignKey: "ProductSubCategoryGUID",
    targetKey: "ProductSubCategoryGUID",
    as: "ProductSubCategory",
  })
  @Column({
    allowNull: true,
    type: DataTypes.INTEGER,

    comment: "ProductSubCategoryGUID",
  })
  ProductSubCategoryGUID!: number;

  @Column({
    allowNull: true,
    type: DataTypes.DECIMAL(10, 3),
    comment: "Unit_Price",
  })
  Unit_Price!: number;

  @Column({
    allowNull: true,
    type: DataTypes.DECIMAL(10, 3),
    comment: "MRP",
  })
  MRP!: number;
  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  GST!: string;
  @Column({
    allowNull: true,
    type: DataTypes.NUMBER,
  })
  Qty!: number;
  @Column({
    allowNull: true,
    type: DataTypes.NUMBER,
  })
  UnitsInStock!: number;

  @Column({
    allowNull: true,
    type: DataTypes.TINYINT,
    comment: "",
    defaultValue: 1,
  })
  IsActive!: number;

  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  SKU!: string;
  @Column({
    allowNull: true,
    type: DataTypes.STRING(100),
  })
  UOM!: string;

  @Column({
    allowNull: true,
    type: DataTypes.INTEGER,
  })
  UOMTypeGUID!: number;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
    comment: "CreatedDate",
  })
  CreatedDate!: Date;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
    comment: "ModifiedDate",
  })
  ModifiedDate!: Date;

  @Column({
    allowNull: true,
    type: DataTypes.DATE,
  })
  DeletedDate!: Date;

  @Column({
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: "CreatedGUID",
    references: {
      model: "User",
      key: "UserGUID",
    },
  })
  CreatedGUID!: number;
  @Column({
    allowNull: true,
    type: DataTypes.INTEGER,
    comment: "ModifiedGUID",
    references: {
      model: "User",
      key: "UserGUID",
    },
  })
  ModifiedGUID!: number;
  @Column({
    allowNull: true,
    type: DataTypes.INTEGER,
    comment: "DeletedGUID",
    references: {
      model: "User",
      key: "UserGUID",
    },
  })
  DeletedGUID!: number;
}
