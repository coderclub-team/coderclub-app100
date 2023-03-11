import { Request, Response } from "express";
import ProductSubCategory from "../../models/product/ProductSubCategory.model";
import { Op } from "sequelize";
import decodeJWT from "../../utils/decodeJWT";
import ProductCategory from "../../models/product/ProductCategory.model";

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
      total: productSubCategories.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
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
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

export const createProductSubCategory = async (req: Request, res: Response) => {
  // add createdGUID using req.body.user.UserGUID or decodeJWT(req)
  if (req.body.user.UserGUID) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  const { ProductCategoryGUID, ProductSubCategoryName } = req.body;

  try {
    const productSubCategory = await ProductSubCategory.create({
      ProductCategoryGUID,
      ProductSubCategoryName,
    });

    res.status(201).json({
      message: "Product sub category created successfully!",
      productSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

export const updateProductSubCategory = async (req: Request, res: Response) => {
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

    productSubCategory.update(req.body, {
      exclude: ["CreatedGUID", "CreatedDate", "ProductSubCategoryGUID"],
    });

    res.status(200).json({
      message: "Product sub category updated successfully!",
      productSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
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
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
