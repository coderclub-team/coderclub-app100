import { NextFunction, Request, Response } from "express";
import path from "node:path";
import User from "../models/User.model";
import fs from "node:fs";
import { userImageUploadOptions } from "../../config";
import { UserNotFoundExceptionError } from "../../custom.error";
import decodeJWT from "../utils/decodeJWT";
import Sale from "../models/Sale.model";
import GlobalType from "../models/GlobalType.model";
import SaleDetail from "../models/SaleDetail.model";
import UserAddress from "../models/UserAddress.model";
import { sequelize } from "../database";
import ProductMaster from "../models/product/ProductMaster.model";
import { Promotion } from "../models/Promotion.model";
import ProductSubscription from "../models/ProductSubscriptions.model";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    const { filename, path: tmpPath } = req.file;
    req.body.tmpPath = tmpPath;
    req.body.uploadPath = path.join(
      userImageUploadOptions.relativePath,
      filename
    );
    req.body.PhotoPath = path.join(userImageUploadOptions.directory, filename);
  }
  try {
    const createdUser = await User.create(req.body);
    if (!createdUser) {
      throw new UserNotFoundExceptionError("User not found!");
    }
    if (req.file) {
      fs.rename(req.body.tmpPath, req.body.uploadPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      createdUser.setFullURL(req, "PhotoPath");
     
    }
    
    return res.status(201).json({
      message: "User created successfully!",
      user: createdUser,
    });
  } catch (error: any) {
    // remove the uploaded file
    if (req.body.tmpPath) {
      fs.unlink(req.body.tmpPath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo, Password } = req.body;

  try {
    if (!MobileNo || !Password) {
      throw new Error("MobileNo or Password is missing");
    }

    const user = await User.findOne({
      where: {
        MobileNo: MobileNo,
      },
      include: [UserAddress,ProductSubscription,],
    });
    if (!user) {
      throw new UserNotFoundExceptionError("User not found!");
    }
    user.setFullURL(req, "PhotoPath");
   
    const token = await user?.authenticate(Password);
    res.status(200).json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get user fromtoken
  try {
    let authuser: User;
    if (req.body.user) {
      authuser = req.body.user;
    } else {
      authuser = decodeJWT(req) as User;
    }
    const user = await User.findByPk(authuser.UserGUID, {
      attributes: {
        exclude: ["Password"],
      },
      include: [UserAddress],
    });

    user?.setFullURL(req, "PhotoPath");

    res.json([user]);
  } catch (error) {
    next(error);
  }
};
export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo, OTP } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    await user.verifyOTP(OTP);
    res.status(200).json({
      message: "User verified successfully!",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};
export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });
    if (!user) {
      throw new UserNotFoundExceptionError("User not found!");
    }
    await user?.sendOTP();
    res.status(200).json({
      message: "OTP sent successfully!",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { MobileNo } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });

    if (!user) {
      throw new UserNotFoundExceptionError("User not found!");
    }

    await user?.sendOTP();

    res.status(200).json({
      message: "OTP sent successfully!",
    });
  } catch (error: any) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // reset password by verifying OTP
  const { MobileNo, OTP, Password,EmailAddress } = req.body;
  const { deleted } = req.query;
  const paranoid = deleted === "true" ? false : true;
  try {
    const user = await User.findOne({
      where: {
        MobileNo,
      },
      paranoid,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    await user.resetPassword(Password, OTP,EmailAddress,MobileNo);
    res.status(200).json({
      message: "Password reset successfully!",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};
export const signout = async (req: Request, res: Response) => {
  res.json({
    message: "Signout should be implemented at the Frontend side!",
  });
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const salemasters = await Sale.findAll({
    where: {
      CustomerGUID: req.body.user.UserGUID,
      
    },
    
    attributes: {
      exclude: ["CustomerGUID", "SaleTypeRef"],
    },

    include: [
      // {
      //   model: User,
      //   as: "Customer",
      // },
      {
        model: GlobalType,
        as: "SaleTypeRef",

        //  Sale type shoudl be astring value of arributes.GlobaleTypeName
        attributes: {
          include: ["GlobalTypeName"],
          exclude: ["GlobalTypeGUID"],
        },
      },
      {
        model: SaleDetail,
        all: true,
        include: [{
          model:ProductMaster,
        }]
      },
      {
        model:Promotion
      }
    ],
  });

  salemasters?.forEach((sale) => {
    sale?.SaleDetails?.forEach(saleDetail=>{
      saleDetail?.product?.setFullURL(req,"PhotoPath")
    })
   
    if (sale.SaleTypeRef) {
      sale.setDataValue("SaleType", sale.SaleTypeRef.GlobalTypeName);
      sale.setDataValue("SaleTypeRef", undefined);
    }
  });

  res.json(salemasters);
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }
  const transaction = await sequelize.transaction();
  
  try {
    const {
      SaleOrderID,
      SaleOrderDate,
      ModeOfPayment,
      SaleChannel,
      SalePlatform,
      CustomerGUID=req.body.user.UserGUID,
      SalesDetails,
      CreatedGUID,
      PaymentTransactionID,
      PromotionGUID
    } = req.body;
    const saleData = {
      SaleOrderID,
      SaleOrderDate,
      SaleChannel,
      CustomerGUID,
      CreatedGUID,
      SalePlatform,
      ModeOfPayment,
      PaymentTransactionID,
      PromotionGUID
    };
    if(!SaleOrderDate){
      throw new Error("SaleOrderDate is required");
    }
  
    else if(!ModeOfPayment){
      throw new Error("ModeOfPayment is required");
    }
    else if(!SaleChannel){
      throw new Error("SaleChannel is required");
    }
    else if(!SalePlatform){
      throw new Error("SalePlatform is required");
    } else if(!PaymentTransactionID){
      throw new Error("PaymentTransactionID is required");
    }
    
    SalesDetails.forEach((saleDetail: any) => {
      if(!saleDetail.ProductGUID){
        throw new Error("ProductGUID is required");
      }
      else if(!saleDetail.Qty){
        throw new Error("Quantity is required");
      }
      else if(!saleDetail.Amount){
        throw new Error("Amount is required");
      }
    });

    if(!Array.isArray(SalesDetails)){
      throw new Error("SaleDetails should be an array");
    }
    
    const sale = await Sale.create(saleData, { transaction });
    const saleDetails = await SaleDetail.bulkCreate(
      SalesDetails.map((saleDetail: any) => ({
        SalesMasterGUID: sale.SalesMasterGUID,
        ...saleDetail,
      })),
      { transaction }
    );
    transaction.commit();
    res.json({
      sale,
      SaleDetails: saleDetails,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { SalesMasterGUID } = req.params;
  if(!SalesMasterGUID){
    throw new Error("SalesMasterGUID is required");
  }else if(!req.body.Status){
    throw new Error("Status is required");
  }
  const transaction = await sequelize.transaction();
  try {
    const sale = await Sale.findByPk(SalesMasterGUID, { transaction });
    if (!sale) {
      throw new Error("Sale not found!");
    }
     sale.Status=req.body.Status;
   const user=await sale.save({ transaction });
    transaction.commit();
    res.json({
      message: "Sale updated successfully!",
      user,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
}