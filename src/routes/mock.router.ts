


// a route for products
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import categories from '../../mock/categories.json'

const router = express.Router();

function fullUrl(request: Request, key: string="identities/user-identity.png") {
    const hostname = request.protocol + "://" + request.get("host");
    const originalPath = key
    const fullPath = `${hostname}/${path.basename(originalPath)}`;
    return fullPath;
  }


router.get("/product_categories", (req:Request,res:Response,next:NextFunction)=>{
    categories.forEach((category)=>{
        category.products.forEach((product)=>{
            product.img = fullUrl(req,product.img) 
        })
    })

    res.status(200).json(categories);
});

export default router;