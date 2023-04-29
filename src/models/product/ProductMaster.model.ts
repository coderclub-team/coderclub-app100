import {
  BeforeBulkCreate,
  BeforeBulkUpdate,
  BeforeCreate,
  BeforeFind,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductCategory from "./ProductCategory.model";
import ProductAndCategoryMap from "./ProductAndCategoryMap.model";
import { sequelize } from "../../database";

@Table({
  tableName: "tbl_ProductMaster",
  timestamps: true,
  paranoid: false,
  createdAt: "CreatedDate",
  // updatedAt: "ModifiedDate",
  // deletedAt: "DeletedDate",
})
class ProductMaster extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  ProductGUID!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  ProductID!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  ProductName!: string;
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  ProductCode!: string;

  // ProductCategoryGUID;
  // ProductSubCategoryGUID;
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "Unit_Price",
  })
  UnitPrice!: number;
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  MRP!: number;
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  GST!: number;
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  Qty!: number;
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  UnitsInStock!: number;
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
  })
  IsActive!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  CreatedDate!: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  SKU!: string;
  @Column
  UOM!: string;
  @Column
  UOMTypeGUID!: string;
  @Column
  PhotoPath!: string;
  ProductType!: string;
  @Column
  GalleryPhotoPath1?: string;
  @Column
  GalleryPhotoPath2?: string;
  @Column
  GalleryPhotoPath3?: string;
  @Column
  GalleryPhotoPath4?: string;
  ProductDescription!: string;
  IsFeatured!: number;
  OnSale!: number;
  Width!: number;
  Height!: number;
  Length!: number;
  Weight!: number;
  ProductSlug!: string;

  @HasMany(() => ProductAndCategoryMap, "ProductrefGUID")
  categories!: ProductCategory[];

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
    instance.ProductCode = instance.ProductID;
  }

  // Getter method to return an array of image URLs
  get images(): string[] {
    const images = [
      this.getDataValue("GalleryPhotoPath1"),
      this.getDataValue("GalleryPhotoPath2"),
      this.getDataValue("GalleryPhotoPath3"),
      this.getDataValue("GalleryPhotoPath4"),
    ];
    // Remove any null or undefined values
    return images.filter((image) => image);
  }

  @BeforeBulkCreate
  @BeforeBulkUpdate
  static beforeBulkCreateHook(instances: ProductMaster[]) {
    instances.forEach((instance) => {
      Object.entries(instance.toJSON()).forEach(([key, value]) => {
        if (typeof value === "string") {
          instance.setDataValue(key as keyof ProductMaster, value.trim());
        }
      });
    });
  }

  @BeforeCreate
  @BeforeUpdate
  static beforeCreateHook(instance: ProductMaster) {
    Object.entries(instance.toJSON()).forEach(([key, value]) => {
      if (typeof value === "string") {
        instance.setDataValue(key as keyof ProductMaster, value.trim());
      }
    });
  }
}

export default ProductMaster;
