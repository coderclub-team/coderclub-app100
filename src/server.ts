import ConnectDB, { sequelize } from "./database";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config().parsed;
import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/auth.router";
import userRouter from "./routes/user.router";
import authGaurd from "./middlewares/authGaurd.middleware";
import employeeRouter from "./routes/employee.router";
import path from "node:path";
import multer from "multer";
import ProductCategory from "./models/product/ProductCategory.model";
import productCategoryRouter from "./routes/product/productCategory.router";
import productSubCategoryRouter from "./routes/product/productSubCategory.router";
import ProductMasterRouter from "./routes/product/ProductMaster.router";
import StoreMasterRouter from "./routes/storeMaster.router";
import LineManRouter from "./routes/lineMan.router";
import cors from "cors";
// Set the base URL and store it in app.locals
const app = express();

// parse application/json
app.use(express.json());
// public directory as static resource
app.use(express.static("public"));
// Error handling middleware for Multer
console.log("Connecting to DB", path.join("public"));
ConnectDB()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
app.use("/api", authRouter);
app.use("/api/users", authGaurd, userRouter);
app.use("/api/employees", authGaurd, employeeRouter);
app.use("/api/productCategories", authGaurd, productCategoryRouter);
app.use("/api/productSubCategories", authGaurd, productSubCategoryRouter);
app.use("/api/productmasters", authGaurd, ProductMasterRouter);
app.use("/api/storeMasters", authGaurd, StoreMasterRouter);
app.use("/api/lineMen", authGaurd, LineManRouter);
app.get("/", async (req, res) => {
  ProductCategory.findAll()
    .then((data: any) => {
      res.json(data);
    })
    .catch((err: any) => {
      console.log("Error", err.message);
      res.json(err);
    });
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    res
      .status(400)
      .json({ message: "Multer error: " + err.message, error: err });
  } else {
    // An unknown error occurred
    res
      .status(500)
      .json({ message: "Unknown error: " + err.message, error: err });
  }
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
