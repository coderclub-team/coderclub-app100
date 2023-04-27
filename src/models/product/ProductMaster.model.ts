import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProductVariant } from "./ProductVariant.model";
// -- ProductGUID
// -- ProductID
// -- ProductName
// -- ProductCode
// -- ProductCategoryGUID
// -- ProductSubCategoryGUID
// -- Unit_Price
// -- MRP
// -- GST
// -- Qty
// -- UnitsInStock
// -- IsActive
// -- CreatedDate
// -- SKU
// -- UOM
// -- UOMTypeGUID
// -- PhotoPath
// -- ProductType

@Table({
  tableName: "tbl_ProductMaster",
  timestamps: true,
  paranoid: false,
  createdAt: "CreatedDate",
  // updatedAt: "ModifiedDate",
  // deletedAt: "DeletedDate",
})
export default class ProductMaster extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  ProductGUID!: number;
  @Column
  ProductID!: string;
  @Column
  ProductName!: string;
  @Column
  ProductCode!: string;
  @Column
  PhotoPath!: string;
  @Column
  ProductType!: string;
  @Column
  GalleryPhotoPath1!: string;
  @Column
  GalleryPhotoPath2!: string;
  @Column
  GalleryPhotoPath3!: string;
  @Column
  GalleryPhotoPath4!: string;

  @HasMany(() => ProductVariant, "ProductMasterRefGUID")
  Variants!: ProductVariant[];
  @BeforeCreate
  static async generateProductGUID(instance: ProductMaster) {
    const nextGUID =
      (((await this.max("ProductGUID")) as null | number) || 0) + 1;

    // const productCategory = await ProductCategory.findByPk(
    //   instance.ProductCategoryGUID
    // );
    // const productSubCategory = await ProductSubCategory.findByPk(
    //   instance.ProductSubCategoryGUID
    // );
    // if (!productCategory || !productSubCategory)
    //   return (instance.ProductID =
    //     "ABC-XYZ-" + nextGUID.toString().padStart(4, "0"));
    // const PRO = productCategory?.ProductCategoryName.substring(
    //   0,
    //   3
    // )?.toUpperCase();
    // const SUB = productSubCategory?.ProductSubCategoryName.substring(
    //   0,
    //   3
    // )?.toUpperCase();
    // instance.ProductID =
    //   PRO + "-" + SUB + "-" + nextGUID.toString().padStart(4, "0");
    instance.ProductID =
      "CAT" + "-" + "SUB" + "-" + nextGUID.toString().padStart(4, "0");

    console.log("@BeforeCreate", {
      ProductID: instance.ProductID,
      nextGUID,
    });
  }
}
