import ConnectDB from "./database";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config().parsed;
import express from "express";
import authRouter from "./routes/auth.router";
import authGaurd from "./middlewares/authGaurd.middleware";
import path from "node:path";
import cors from "cors";
import userRouter from "./routes/user.router";
import productCategoryRouter from "./routes/product/productCategory.router";
import productSubCategoryRouter from "./routes/product/productSubCategory.router";
import productMasterRouter from "./routes/product/ProductMaster.router";
import trimRequestBody from "./middlewares/trimRequestBody.middleware";

// Set the base URL and store it in app.locals
const app = express();
app.use(express.static("public"));
app.use(cors());

// parse application/json

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("Connecting to DB", path.join("public"));
ConnectDB()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

app.get("/api", async (req, res) => {});
app.use("/api", authRouter);
app.use("/api/users", authGaurd, userRouter);
app.use("/api/productMasters", authGaurd, productMasterRouter);
app.use("/api/productcategories", productCategoryRouter);
app.use("/api/productsubcategories", productSubCategoryRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
