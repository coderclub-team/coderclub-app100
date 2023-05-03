import ConnectDB from "./database";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config().parsed;
import express, { Request, Response } from "express";
import authRouter from "./routes/auth.router";
import authGaurd from "./middlewares/authGaurd.middleware";
import path from "node:path";
import cors from "cors";
import userRouter from "./routes/user.router";
import productCategoryRouter from "./routes/product/productCategory.router";
import productSubCategoryRouter from "./routes/product/productSubCategory.router";
import productMasterRouter from "./routes/product/ProductMaster.router";
import app_config from "./data/app_config";

// const app_config = fs.readFileSync(
//   path.join(__dirname, "../public/data/app_config.json"),
//   "utf-8"
// );

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
app.get("/api/app/config", (req: Request, res: Response) => {
  const host = req.protocol + "://" + req.get("host");
  app_config.applogo[0].image = host + "/" + app_config.applogo[0].image;
  app_config.splashlogo[0].image = host + "/" + app_config.splashlogo[0].image;
  app_config.walkthrogh.forEach((item) => {
    item.image = host + "/" + item.image;
  });

  res.status(200).json(app_config);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
