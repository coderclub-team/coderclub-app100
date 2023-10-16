// a route for products
import express, { NextFunction, Request, Response } from "express";
import categories from '../../mock/categories.json'

const router = express.Router();

function fullUrl(request: Request, key: string = "identities/user-identity.png") {
    let hostname=''
     hostname = request.protocol + "://" + request.get("host");
    const fullPath = `${hostname}/${key}`;
    return fullPath;
}

import fs from 'fs';
import path from 'path';

router.get("/product_categories", (req:Request,res:Response,next:NextFunction)=>{
    const categoriesPath = path.join(__dirname, '../../mock/categories.json');
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

    categories.forEach((category:any)=>{
        category.products.forEach((product:any)=>{
            product.img = fullUrl(req,product.img) 
        })
    })

    res.status(200).json(categories);
});

export default router;


