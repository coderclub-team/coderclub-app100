import { Request, Response, NextFunction } from "express";
import { Promotion } from "../models/promotion.model";
import Sale from "../models/sale.model";
import { sequelize } from "../database";
import { Op } from "sequelize";
import User from "../models/user.model";

const couponGuard = async (req: Request, res: Response, next: NextFunction) => {

    
  
    const { PromoCode, GrossTotal } = req.method==="GET"?req.query: req.body;
    if (!PromoCode) return next();
    const UserGUID=req.body.user.UserGUID
    if(!UserGUID) return res.status(400).json({ message: "UserGUID is required for apply a coupon" });
    if(!GrossTotal) return res.status(400).json({ message: "GrossTotal is required for apply a coupon" });
    const transaction = await sequelize.transaction();

    try {
        const promotion = await Promotion.findOne({
            where: {
                PromoCode,
                Status: "ACTIVE",
                Stock: {
                    [Op.gt]: 0,
                },
                CurrentStock: {
                    [Op.gt]: 0,
                },
                StartDate: {
                    [Op.lte]: new Date(),
                },
                EndDate: {
                    [Op.gte]: new Date(),
                },
                MinOrderTotal: {
                    [Op.gte]: GrossTotal,
                },
            },
            transaction,
        });

        if (!promotion) {
            await transaction.rollback();
            return res.status(404).json({ message: "Invalid Coupon" });
        }

        const { count } = await Sale.findAndCountAll({
            where: {
                CreatedGUID: UserGUID,
                PromotionGUID: promotion.PromotionGUID,
            },
            transaction,
        });

        if (count >= promotion.UsageLimit) {
            await transaction.rollback();
            return res.status(400).json({ message: "Coupon already used" });
        }

       
        await transaction.commit();
        req.body.promotion=promotion.toJSON();
        next()
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default couponGuard;
