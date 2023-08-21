// a controller for product

import { NextFunction, Request, Response } from "express";

import ProductCategory from "../models/product-category.model";
// import { productCategoryImageUploadOptions } from "../../config";

export const getAllProductCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductCategory.findAll({});
    categories.forEach(async (category: ProductCategory) => {
      category.setFullURL(req, "PhotoPath");
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
    category?.setFullURL(req, "PhotoPath");

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
  req.body.CreatedGUID = req.body.user.UserGUID;

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
