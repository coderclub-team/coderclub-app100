import { NextFunction, Request, Response } from "express";
import { Promotion } from "../models/promotion.model";


export const getAllPromotions=async(req:Request,res:Response,next:NextFunction)=>{
  
try {
   const promotions=await Promotion.findAll()
    res.status(200).json(promotions)
} catch (error) {
    next(error)
}
   



}