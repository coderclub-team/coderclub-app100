// tbl_ProductReviews model

import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductMaster from "./ProductMaster.model";
import User from "../User.model";

// ReviewGUID;
// Review;
// ProductGUID;
// CreatedUserGUID;
// CreatedDate;

@Table({
  tableName: "tbl_ProductReviews",
  timestamps: false,
})
class ProductReview extends Model {
  @PrimaryKey
  @Column
  ReviewGUID?: string;

  @Column({
    references: {
      key: "ProductGUID",
      model: "ProductMaster",
    },
  })
  @ForeignKey(() => ProductMaster)
  ProductGUID?: string;

  @Column({
    references: {
      key: "UserGUID",
      model: "User",
    },
  })
  @ForeignKey(() => User)
  CreatedUserGUID?: string;

  @BelongsTo(() => User)
  user!: User;

  @Column
  CreatedDate?: Date;
  // @Column
  // Status: "Active" | "Deactived" | "Pending" | "Blocked" = "Active";

  @Column
  Review?: string;
}

export default ProductReview;
