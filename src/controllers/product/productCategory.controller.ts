// a controller for product

import { NextFunction, Request, Response } from "express";
import ProductCategory from "../../models/product/ProductCategory.model";
import decodeJWT from "../../utils/decodeJWT";
import ProductSubCategory from "../../models/product/ProductSubCategory.model";
// import { productCategoryImageUploadOptions } from "../../config";

export const getAllProductCategories = async (req: Request, res: Response) => {
  try {
    const productCategories = await ProductCategory.findAll({
      attributes: {
        exclude: ["CreatedGUID", "CreatedDate"],
      },
      paranoid: false,
      // include: {
      //   model: ProductSubCategory,
      //   attributes: ["ProductSubCategoryName"],
      // },
    });

    res.status(200).json({
      message: "Product categories fetched successfully!",
      productCategories,
      total: productCategories.length,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductCategoryById = async (req: Request, res: Response) => {
  const { ProductCategoryGUID } = req.params;

  try {
    const productCategory = await ProductCategory.findByPk(
      ProductCategoryGUID,
      {
        attributes: {
          exclude: ["CreatedGUID", "CreatedDate"],
        },
      }
    );

    if (!productCategory) {
      return res.status(400).json({
        message: "Product category not found!",
      });
    }

    res.send({
      message: "Product category fetched successfully!",
      productCategory,
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

export const updateProductCategory = async (req: Request, res: Response) => {
  // add modifiedGUID using req.body.user.UserGUID or decodeJWT(req)
  if (req.body.user.UserGUID) {
    req.body.ModifiedGUID = req.body.user.UserGUID;
  } else {
    req.body.ModifiedGUID = decodeJWT(req).UserGUID;
  }

  const { ProductCategoryGUID } = req.params;
  try {
    const productCategory = await ProductCategory.findByPk(ProductCategoryGUID);

    if (!productCategory) {
      return res.status(400).json({
        message: "Product category not found!",
      });
    }

    await productCategory.update(req.body, {
      exclude: ["CreatedGUID", "CreatedDate", "ProductCategoryGUID"],
    });

    res.send({
      message: "Product category updated successfully!",
      productCategory,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

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
