import { NextFunction, Request, Response } from "express";
import { productImageUploadOptions } from "../../../config";
import ProductMaster from "../../models/product/ProductMaster.model";
import decodeJWT from "../../utils/decodeJWT";
import path from "node:path";
import fs from "node:fs";

export const getAllProductMasters = async (req: Request, res: Response) => {
  try {
    const productMasters = await ProductMaster.findAll({
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

export const createProductMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.ProductType === "Simple") {
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

    if (req.body.user) {
      req.body.CreatedGUID = req.body.user.UserGUID;
    } else {
      req.body.CreatedGUID = decodeJWT(req).UserGUID;
    }

    try {
      const product = await ProductMaster.create(req.body);
      res.status(201).json({
        message: "Product master created successfully!",
        product,
      });
    } catch (error: any) {
      console.log("error", error.message);
      next(error);
    }
  } else if (req.body.ProductType === "Variable") {
    try {
      const product = await ProductMaster.create(req.body);
      res.status(201).json({
        message: "Product master created successfully!",
        product,
      });
    } catch (error: any) {
      console.log("error", error.message);
      next(error);
    }
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
      attribute: "",
      ProductMasterGUID: productGUID,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
