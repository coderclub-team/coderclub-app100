import ConnectDB from "./database";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config().parsed;
import cron from 'node-cron'
import express, { Request, Response } from "express";
import authRouter from "./routes/auth.router";
import authGaurd from "./middlewares/authGaurd.middleware";
import path from "node:path";
import cors from "cors";
import userRouter from "./routes/user.router";
import productCategoryRouter from "./routes/product/productCategory.router";
import productSubCategoryRouter from "./routes/product/productSubCategory.router";
import productMasterRouter from "./routes/product/ProductMaster.router";
import saleRouter from "./routes/sale.router";
import cartItemsRouter from "./routes/cartitems.router";
import userAddressesRouter from "./routes/userAddresses.route";
import productSubscriptionsRouter from "./routes/productSubscriptions.router";
import handleSequelizeError from "./middlewares/handleSequelizeError";
import { billingcyclesRouter } from "./routes/general.router";
import walletRouter from "./routes/wallet.router";
import { expireSubscription } from "./controllers/productSubscriptions.controller";
// Set the base URL and store it in app.locals
const app = express();
app.use(express.static("public"));
app.use(cors())


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

app.use("/api/users", authGaurd, userRouter);
app.use("/api/cartitems", authGaurd, cartItemsRouter);
app.use("/api/addresses", authGaurd, userAddressesRouter);
app.use("/api/productMasters", productMasterRouter);
app.use("/api/productcategories", productCategoryRouter);
app.use("/api/productsubcategories", productSubCategoryRouter);
app.get("/api/app/config", (req: Request, res: Response) => {
  const app_config = {
    splashlogo: [
      {
        image: "splashscreen/splash_logo.gif",
      },
    ],
    applogo: [
      {
        image: "icons/milk_bottle.png",
      },
    ],
    walkthrogh: [
      {
        title: "Pick up",
        description:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        image: "walkthrough/pickup.png",
      },
      {
        title: "Transport",
        description:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        image: "walkthrough/transport.png",
      },
      {
        title: "Dellivery",
        description:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        image: "walkthrough/delivery.png",
      },
    ],
  };
  const host = req.protocol + "://" + req.get("host");
  app_config.applogo[0].image = host + "/" + app_config.applogo[0].image;
  app_config.splashlogo[0].image = host + "/" + app_config.splashlogo[0].image;
  app_config.walkthrogh.forEach((item) => {
    item.image = host + "/" + item.image;
  });

  res.status(200).json(app_config);
});

app.use("/api/sales", authGaurd, saleRouter);
app.use("/api", authRouter);
app.use(
  "/api/subscriptions",
  authGaurd,
  productSubscriptionsRouter,
  handleSequelizeError
);
app.use("/api/billingcycles", billingcyclesRouter, handleSequelizeError);
app.use("/api/wallets",authGaurd, walletRouter, handleSequelizeError);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

cron.schedule('0 0 0 * * *', async() => {
 await expireSubscription()
  console.log('running a task every day at 12:00 am');
},{
  scheduled: true,
  timezone: "Asia/Kolkata"
})


