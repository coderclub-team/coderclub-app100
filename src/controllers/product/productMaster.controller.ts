import { Request, Response } from "express";
import ProductCategory from "../../models/product/ProductCategory.model";
import ProductMaster from "../../models/product/ProductMaster.model";
import ProductSubCategory from "../../models/product/ProductSubCategory.model";
import decodeJWT from "../../utils/decodeJWT";

export const getAllProductMasters = async (req: Request, res: Response) => {
  try {
    const productMasters = await ProductMaster.findAll({
      include: [
        {
          model: ProductCategory,
          attributes: {
            exclude: [
              "CreatedGUID",
              "CreatedDate",
              "ModifiedGUID",
              "UpdatedDate",
              "DeletedGUID",
              "DeletedDate",
            ],
          },
        },
        {
          model: ProductSubCategory,
          attributes: {
            exclude: [
              "CreatedGUID",
              "CreatedDate",
              "ModifiedGUID",
              "UpdatedDate",
              "DeletedGUID",
              "DeletedDate",
            ],
          },
        },
      ],

      attributes: {
        exclude: [
          "CreatedGUID",
          "CreatedDate",
          "ModifiedGUID",
          "UpdatedDate",
          "DeletedGUID",
          "DeletedDate",
        ],
      },
    });

    res.status(200).json({
      message: "Product masters fetched successfully!",
      productMasters,
    });
  } catch (error: any) {
    console.log("---error", error.message);
    res.status(500).json(error);
  }
};

export const getProductMasterById = async (req: Request, res: Response) => {
  const { ProductMasterGUID } = req.params;

  try {
    const productMaster = await ProductMaster.findByPk(ProductMasterGUID, {
      include: [
        {
          model: ProductCategory,
          attributes: {
            exclude: [
              "CreatedGUID",
              "CreatedDate",
              "ModifiedGUID",
              "UpdatedDate",
              "DeletedGUID",
              "DeletedDate",
            ],
          },
        },
        {
          model: ProductSubCategory,
          attributes: {
            exclude: [
              "CreatedGUID",
              "CreatedDate",
              "ModifiedGUID",
              "UpdatedDate",
              "DeletedGUID",
              "DeletedDate",
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          "CreatedGUID",
          "CreatedDate",
          "ModifiedGUID",
          "UpdatedDate",
          "DeletedGUID",
          "DeletedDate",
        ],
      },
    });

    if (!productMaster) {
      return res.status(400).json({
        message: "Product master not found!",
      });
    }

    res.send({
      message: "Product master fetched successfully!",
      productMaster,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProductMaster = async (req: Request, res: Response) => {
  if (req.body.user.UserGUID) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  try {
    const productMaster = await ProductMaster.create(req.body);

    res.status(201).json({
      message: "Product master created successfully!",
      productMaster,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProductMaster = async (req: Request, res: Response) => {
  const { ProductMasterGUID } = req.params;

  if (req.body.user.UserGUID) {
    req.body.ModifiedGUID = req.body.user.UserGUID;
  } else {
    req.body.ModifiedGUID = decodeJWT(req).UserGUID;
  }

  try {
    const productMaster = await ProductMaster.findByPk(ProductMasterGUID, {
      include: [
        {
          model: ProductCategory,
          attributes: {
            exclude: [
              "CreatedGUID",
              "CreatedDate",
              "ModifiedGUID",
              "UpdatedDate",
              "DeletedGUID",
              "DeletedDate",
            ],
          },
        },
        {
          model: ProductSubCategory,
          attributes: {
            exclude: [
              "CreatedGUID",
              "CreatedDate",
              "ModifiedGUID",
              "UpdatedDate",
              "DeletedGUID",
              "DeletedDate",
            ],
          },
        },
      ],
    });

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
        message: "Product master not found!",
      });
    }

    await productMaster.destroy();

    res.send({
      message: "Product master deleted successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
