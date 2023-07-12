import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductMaster from "./product/ProductMaster.model";
import User from "./User.model";

@Table({
  tableName: "tbl_CartItems",
  timestamps: false,
  paranoid: false,
})
class CartItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  CartItemGUID?: number;

  @ForeignKey(() => ProductMaster)
  @Column
  ProductGUID?: number;

  @Column
  Quantity?: number;

  @Column
  @ForeignKey(() => User)
  CreatedGUID?: number;

  @Column
  CreatedDate?: Date;

  @BelongsTo(() => ProductMaster)
  Product?: ProductMaster;
}

export default CartItem;
