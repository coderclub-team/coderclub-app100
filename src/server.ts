import ConnectDB from "./database";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config().parsed;
import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/auth.router";
import bodyParser from "body-parser";

import path from "node:path";

import ProductCategory from "./models/product/ProductCategory.model";
import cors from "cors";
import handleSequelizeError from "./middlewares/handleSequelizeError";
import userRouter from "./routes/user.router";
import multer from "multer";

// Set the base URL and store it in app.locals
const app = express();
app.use(express.static("public"));
app.use(cors());

// parse application/json

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(bodyParser.json()

// app.use(bodyParser.urlencoded({ extended: true }));

// public directory as static resource

// Error handling middleware for Multer
console.log("Connecting to DB", path.join("public"));
ConnectDB()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

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
app.use("/api", authRouter);
app.use("/api/users", userRouter);
// Error handler middleware function for handling multer errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred during file upload
    res.status(400).json({ message: "Error uploading file", error: err });
  } else {
    // Other error occurred
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
