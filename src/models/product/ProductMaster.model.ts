import {
  BeforeCreate,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
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
  timestamps: false,
  paranoid: false,
  // createdAt: "CreatedDate",
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
  ProductCategoryGUID!: number;
  @Column
  ProductSubCategoryGUID!: number;
  @Column
  Unit_Price!: number;
  @Column
  MRP!: number;
  @Column
  GST!: number;
  @Column
  Qty!: number;
  @Column
  UnitsInStock!: number;
  @Column
  IsActive!: boolean;
  @Column
  SKU!: string;
  @Column
  UOM!: string;
  @Column
  UOMTypeGUID!: number;
  @Column
  ProductType!: string;

  @BeforeCreate
  static async generateProductGUID(instance: ProductMaster) {
    const nextGUID =
      (((await this.max("ProductGUID")) as null | number) || 0) + 1;
    console.log({
      ProductID: instance.ProductID,
      nextGUID,
    });
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
  }
}
