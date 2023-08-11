import { NextFunction, Request, Response } from "express";
import Employee from "../models/Employee.model";
import mutler from "multer";
import path from "node:path";
import fs from "node:fs";
import decodeJWT from "../utils/decodeJWT";
import { employeeImageUploadOptions } from "../../config";
import { Promotion } from "../models/Promotion.model";


export const getAllPromotions=async(req:Request,res:Response,next:NextFunction)=>{
  
try {
   const promotions=await Promotion.findAll()
    res.status(200).json(promotions)
} catch (error) {
    next(error)
}
   



}