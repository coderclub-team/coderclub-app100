import { NextFunction, Request, Response } from "express";
import { productImageUploadOptions } from "../../../config";
import ProductMaster from "../../models/product/ProductMaster.model";
import decodeJWT from "../../utils/decodeJWT";
import path from "node:path";
import { sequelize } from "../../database";
import { ProductVariant } from "../../models/product/ProductVariant.model";
import { Sequelize } from "sequelize-typescript";
import {
  Filterable,
  Op,
  QueryTypes,
  Transaction,
  WhereOptions,
} from "sequelize";
import ProductCategory from "../../models/product/ProductCategory.model";

type MyWhereType = Filterable<any>["where"] & WhereOptions<any>;

export const getAllProductMasters = async (req: Request, res: Response) => {
  const { ProductGUID, ProductID, ProductName, ProductCode, ProductType, SKU } =
    req.query;

  const where: MyWhereType = {};
  if (ProductGUID) {
    where.ProductGUID = ProductGUID;
  }

  if (ProductID) {
    where.ProductID = ProductID;
  }
  if (ProductName) {
    where.ProductName = ProductName;
  }
  if (ProductCode) {
    where.ProductCode = {
      [Op.like]: `%${ProductCode}%`,
    };
  }
  if (ProductType) {
    where.ProductType = {
      [Op.like]: `%${ProductType}%`,
    };
  }
  if (SKU) {
    where.SKU = SKU;
  }

  try {
    var products = await ProductMaster.findAll({
      where,
      include: [
        {
          model: ProductCategory,
          attributes: ["ProductCategoryName", "PhotoPath"],
        },
      ],
    });

    const mappedProducts = await mapAllProducts(products, req);
    res.status(200).json(mappedProducts);
  } catch (error: any) {
    console.log("---error", error.message);
    res.status(500).json(error);
  }
};

export const getProductByQuery = async (req: Request, res: Response) => {
  try {
    const { ProductName, SKU } = req.query;
    var product = await ProductMaster.findOne({
      where: {
        ProductName: {
          [Op.like]: `%${ProductName}%`,
        },
        SKU,
      },
    });

    if (!product) {
      return res.status(400).json({
        message: "Product not found!",
      });
    }

    res.status(200).json(product);
  } catch (error: any) {
    console.log("---error", error.message);
    res.status(500).json(error);
  }
};

export const createProductMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.ProductType) {
    res.status(400).json({
      message: "Product type is required!",
    });
  } else if (
    req.body.ProductType.toString().toLocaleUpperCase() === "SIMPLE" &&
    req.body.variants.length > 1
  ) {
    res.status(400).json({
      message: "Product type is simple, More than one variant not allowed!",
    });
  }
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }
  console.log("req.body", req.body);
  const {
    ProductName,
    ProductCode,
    ProductType,
    PhotoPath,
    GalleryPhotoPath1,
    GalleryPhotoPath2,
    GalleryPhotoPath3,
    GalleryPhotoPath4,
    variants,
  } = req.body;
  let t: Transaction | undefined = undefined;
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded.");
    } else {
      Object.entries(req.files).forEach(([key, value]) => {
        console.log(key, value);
        req.body[key] = path.join(
          productImageUploadOptions.directory,
          value[0].filename
        );
      });
    }

    t = await sequelize.transaction();

    if (req.body.ProductType.toString().toLocaleUpperCase() === "SIMPLE") {
      const product = await ProductMaster.create(
        {
          ProductName,
          ProductCode,
          ProductType,
          PhotoPath,
          GalleryPhotoPath1,
          GalleryPhotoPath2,
          GalleryPhotoPath3,
          GalleryPhotoPath4,
          CreatedGUID: req.body.CreatedGUID,
        },
        {
          transaction: t,
        }
      );
      let createdVariants = await ProductVariant.bulkCreate(
        variants.map((variant: any) => ({
          ...variant,
          ProductMasterRefGUID: product.ProductGUID,
          CreatedGUID: req.body.CreatedGUID,
        })),
        {
          transaction: t,
        }
      );

      await t.commit();

      res.status(201).json({
        message: "Product master created successfully!",
        product: {
          ...product.toJSON(),
          variants: createdVariants,
        },
      });
    } else if (
      req.body.ProductType.toString().toLocaleUpperCase() === "VARIABLE"
    ) {
      variants.forEach((variant: any) => {
        // check if the variant has a Size or Color or Flavour otherwise throw error
        if (!variant.Size && !variant.Color && !variant.Flavour) {
          throw new Error(
            "Size or Color or Flavour is required for each variant!"
          );
        }
      });

      const product = await ProductMaster.create(req.body);
      const objects = [];

      if (Array.isArray(req.body.ProductCategoryRefGUID)) {
        let objs = req.body.ProductCategoryRefGUID.map((category: any) => ({
          ProductCategoryRefGUID: +category,
          ProductRefGUID: product.ProductGUID,
        }));
        console.log("objects", objs);
        objects.push(...objs);
      } else if (
        req.body.ProductCategoryRefGUID &&
        !isNaN(req.body.ProductCategoryRefGUID)
      ) {
        objects.push({
          ProductCategoryRefGUID: req.body.ProductCategoryRefGUID,
          ProductRefGUID: product.ProductGUID,
        });
      } else {
        objects.push({
          ProductCategoryRefGUID: 1,
          ProductRefGUID: product.ProductGUID,
        });
      }

      await t.commit().catch((error) => {
        console.error("Error occurred while committing transaction:", error);
        t?.rollback();
      });

      res.status(201).json({
        message: "Product master created successfully!",
        product: {
          ...product.toJSON(),
        },
      });
    }
  } catch (error: any) {
    next(error);
  } finally {
  }
  // try {
  //   console.log("req.file.filename", req!.file);
  //   if (req.file) {
  //     const { filename, path: tmpPath } = req.file;
  //     req.body.tmpPath = tmpPath;
  //     req.body.uploadPath = path.join(
  //       productImageUploadOptions.relativePath,
  //       filename
  //     );
  //     req.body.PhotoPath = path.join(
  //       productImageUploadOptions.directory,
  //       filename
  //     );
  //   }
  //   const ceratedPhoto = await ProductMaster.create(req.body);
  //   if (req.body.tmpPath && req.body.uploadPath) {
  //     fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
  //       if (err) console.log(err);
  //       else
  //         ceratedPhoto!.PhotoPath = path.join(
  //           req.protocol + "://" + req.get("host"),
  //           ceratedPhoto!.PhotoPath
  //         );
  //     });
  //   }
  //   res.status(201).json({
  //     message: "Product master created successfully!",
  //   });
  // } catch (error) {
  //   next(error);
  // }
};
export const updateProductMaster = async (req: Request, res: Response) => {
  const { ProductMasterGUID } = req.params;
  if (req.body.user.UserGUID) {
    req.body.ModifiedGUID = req.body.user.UserGUID;
  } else {
    req.body.ModifiedGUID = decodeJWT(req).UserGUID;
  }
  try {
    const productMaster = await ProductMaster.findByPk(ProductMasterGUID);
    if (!productMaster) {
      return res.status(400).json({
        message: "Product master not found!",
      });
    }
    await productMaster.update(req.body);
    res.send({
      message: "Product master updated successfully!",
      productMaster,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteProductMaster = async (req: Request, res: Response) => {
  if (req.body.user.UserGUID) {
    req.body.DeletedGUID = req.body.user.UserGUID;
  } else {
    req.body.DeletedGUID = decodeJWT(req).UserGUID;
  }
  const { ProductMasterGUID } = req.params;
  try {
    const productMaster = await ProductMaster.findByPk(ProductMasterGUID);
    if (!productMaster) {
      return res.status(400).json({
        message: "Product master not found!!",
      });
    }
    await ProductMaster.destroy({
      where: {
        ProductMasterGUID,
      },
    });
    res.send({
      message: "Product master deleted successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const createAttribute = async (req: Request, res: Response) => {
  // get productGUID from params
  const { productGUID } = req.params;
  try {
    res.status(201).json({
      message: "Attribute created successfully!",
      // attribute
      // ProductMasterGUID: productGUID,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

async function mapAllProducts(products: ProductMaster[], req: Request) {
  const options = await getProductOptions();
  const host = req.protocol + "://" + req.get("host");

  products.forEach((product: ProductMaster) => {
    // adding attributes to product
    const found = options.find((o) => o.ProductName === product.ProductName);
    if (found) {
      product.attributes = [
        {
          name: "Qty",
          options: found.options.replace(/\s/g, "").split(","),
          variation: true,
          visible: true,
        },
      ];
    }
    // adding categories to product

    if (product.ProductCategory)
      product.Categories = [
        {
          name: product.ProductCategory.ProductCategoryName,
        },
      ];
    const images = [];
    for (let i = 1; i <= 4; i++) {
      const imageKey = `GalleryPhotoPath${i}`;
      const imagePath = product[imageKey as keyof ProductMaster];

      if (imagePath) {
        const imageFullPath = new URL(path.join(host, imagePath)).toString();

        if (imagePath) {
          images.push({
            id: i,
            src: imageFullPath,
            name: path.basename(imagePath),
            alt: path.basename(imagePath),
          });
        }
      }
    }
    if (product.PhotoPath)
      product.setDataValue(
        "PhotoPath",
        new URL(path.join(host, product.PhotoPath).toString())
      );

    product.setDataValue("GalleryPhotoPath1", undefined);
    product.setDataValue("GalleryPhotoPath2", undefined);
    product.setDataValue("GalleryPhotoPath3", undefined);
    product.setDataValue("GalleryPhotoPath4", undefined);
    product.setDataValue("Images", images);
  });

  products.forEach((p) => {
    p.attributes = p.attributes.reduce((acc: any, curr: any) => {
      const matchingAttribute = acc.find((a: any) => a.name === curr.name);
      if (matchingAttribute) {
        matchingAttribute.options.push(curr.options[0]);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    p.Dimensions = {
      height: p.Height || 0,
      width: p.Width || 0,
      length: p.Length || 0,
    };
    delete p.Height;
    delete p.Width;
    delete p.Length;
  });
  return products;
}

function getProductOptions(): Promise<
  {
    ProductName: string;
    options: string;
  }[]
> {
  const query = `
SELECT  ProductName, 
STUFF((SELECT ', ' + CONCAT(SKU,UOM)
FROM tbl_ProductMaster as p2
WHERE p1.ProductName = p2.ProductName
FOR XML PATH('')), 1, 2, '') AS options
from tbl_ProductMaster as p1 GROUP by ProductName
`;
  return sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
}
