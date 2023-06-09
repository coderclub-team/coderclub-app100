// a controller for product

import { NextFunction, Request, Response } from "express";

import decodeJWT from "../../utils/decodeJWT";
import path from "node:path";
import ProductCategory from "../../models/product/ProductCategory.model";
import ProductMaster from "../../models/product/ProductMaster.model";
// import { productCategoryImageUploadOptions } from "../../config";

export const getAllProductCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductCategory.findAll({});
    categories.forEach(async (category: ProductCategory) => {
      const imageKey = "PhotoPath";
      const imagePath = category[imageKey as keyof ProductCategory];
      if (!imagePath) return;
      const host = req.protocol + "://" + req.get("host");
      const imageFullPath = path.join(host, imagePath);
      category.setDataValue("PhotoPath", imageFullPath);
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductCategoryById = async (req: Request, res: Response) => {
  const { ProductCategoryGUID } = req.params;

  try {
    const category = await ProductCategory.findByPk(ProductCategoryGUID);

    const imageKey = "PhotoPath";
    const imagePath = category?.[imageKey as keyof ProductCategory];
    if (!imagePath) return;
    const host = req.protocol + "://" + req.get("host");
    const imageFullPath = path.join(host, imagePath);
    category.setDataValue("PhotoPath", imageFullPath);

    if (!category) {
      return res.status(400).json({
        message: "Product category not found!",
      });
    }

    res.send({
      message: "Product category fetched successfully!",
      category,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProductCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  try {
    const productCategory = await ProductCategory.create(req.body);

    res.send({
      message: "Product category created successfully!",
      productCategory,
    });
  } catch (error: any) {
    console.log("productCategory.controller", error.message);
    next(error);
  }
};

// export const updateProductCategory = async (req: Request, res: Response) => {
//   if (req.body.user.UserGUID) {
//     req.body.ModifiedGUID = req.body.user.UserGUID;
//   } else {
//     req.body.ModifiedGUID = decodeJWT(req).UserGUID;
//   }

//   const { ProductCategoryGUID } = req.params;
//   try {
//     const productCategory = await ProductCategory.findByPk(ProductCategoryGUID);

//     if (!productCategory) {
//       return res.status(400).json({
//         message: "Product category not found!",
//       });
//     }

//     await productCategory.update(req.body, {
//       exclude: ["CreatedGUID", "CreatedDate", "ProductCategoryGUID"],
//     });

//     res.send({
//       message: "Product category updated successfully!",
//       productCategory,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const deleteProductCategory = async (req: Request, res: Response) => {
  const { ProductCategoryGUID } = req.params;
  try {
    const productCategory = await ProductCategory.findByPk(ProductCategoryGUID);

    if (!productCategory) {
      return res.status(400).json({
        message: "Product category not found!",
      });
    }

    await productCategory.destroy();

    res.send({
      message: "Product category deleted successfully!",
      productCategory,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Path: src/routes/productCategoryRoute.ts
