import { NextFunction, Request, Response } from "express";
import ProductSubCategory from "../../models/product/ProductSubCategory.model";
import { Op } from "sequelize";
import decodeJWT from "../../utils/decodeJWT";
import ProductCategory from "../../models/product/ProductCategory.model";
import { ProductCategoryNotFoundException } from "../../../custom.error";

export const getAllProductSubCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const productSubCategories = await ProductSubCategory.findAll({
      attributes: {
        exclude: ["CreatedGUID", "CreatedDate"],
      },
      // ProductCategory refe
      include: {
        model: ProductCategory,
        attributes: ["ProductCategoryName"],
      },
    });

    res.status(200).json({
      message: "Product sub categories fetched successfully!",
      productSubCategories,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductSubCategoryById = async (
  req: Request,
  res: Response
) => {
  const { ProductSubCategoryGUID } = req.params;

  try {
    const productSubCategory = await ProductSubCategory.findByPk(
      ProductSubCategoryGUID,
      {
        attributes: {
          exclude: ["CreatedGUID", "CreatedDate"],
        },
        include: {
          model: ProductCategory,
          attributes: ["ProductCategoryName"],
        },
      }
    );

    if (!productSubCategory) {
      return res.status(400).json({
        message: "Product sub category not found!",
      });
    }

    res.send({
      message: "Product sub category fetched successfully!",
      productSubCategory,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProductSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // add createdGUID using req.body.user.UserGUID or decodeJWT(req)

  if (req.body.user.UserGUID) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  try {
    // Check if the ProductCategoryGUID value exists in the ProductCategory table
    const category = await ProductCategory.findByPk(
      req.body.ProductCategoryGUID
    );
    // if (!category) {
    //   throw new ProductCategoryNotFoundException("Product category not found!");
    // }

    const productSubCategory = await ProductSubCategory.create(req.body);

    res.status(201).json({
      message: "Product sub category created successfully!",
      productSubCategory,
    });
  } catch (error: any) {
    console.log("error", error.message);
    next(error);
  }
};

export const updateProductSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // add modifiedGUID using req.body.user.UserGUID or decodeJWT(req)
  if (req.body.user.UserGUID) {
    req.body.ModifiedGUID = req.body.user.UserGUID;
  } else {
    req.body.ModifiedGUID = decodeJWT(req).UserGUID;
  }

  const { ProductSubCategoryGUID } = req.params;

  try {
    const productSubCategory = await ProductSubCategory.findByPk(
      ProductSubCategoryGUID
    );

    if (!productSubCategory) {
      return res.status(400).json({
        message: "Product sub category not found!",
      });
    }

    productSubCategory!.set({
      ProductSubCategoryName: req.body.ProductSubCategoryName,
      ProductCategoryGUID: req.body.ProductCategoryGUID,
    });
    await productSubCategory.save({
      fields: ["ProductSubCategoryName", "ProductCategoryGUID"],
    });

    res.status(200).json({
      message: "Product sub category updated successfully!",
      productSubCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductSubCategory = async (req: Request, res: Response) => {
  const { ProductSubCategoryGUID } = req.params;

  try {
    const productSubCategory = await ProductSubCategory.findByPk(
      ProductSubCategoryGUID
    );

    if (!productSubCategory) {
      return res.status(400).json({
        message: "Product sub category not found!",
      });
    }

    productSubCategory.destroy();

    res.status(200).json({
      message: "Product sub category deleted successfully!",
      productSubCategory,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
