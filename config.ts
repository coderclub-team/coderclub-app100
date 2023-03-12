import { SequelizeOptions } from "sequelize-typescript";
import path from "node:path";
import multer from "multer";
import { Request } from "express";

export const sequelizeConnectionOptions: SequelizeOptions = {
  dialect: "mssql",

  host: "154.61.74.30",
  port: 1533,
  username: "gkdairy",
  password: "yinq9327YI",
  database: "GKDairy",

  dialectOptions: {
    options: {
      encrypt: false,
    },
    setTimeout: 50000,
    clearTimeout: 50000,
  },
  // models: [__dirname + "/**/*.model.ts"],
};

export const employeeImageUploadOptions = {
  directory: path.join("uploads"),
  relativePath: "public/uploads/",
  limits: { fileSize: 1024 * 1024 * 1 },
};
export const userImageUploadOptions = {
  directory: path.join("uploads"),
  tmpFilePath: path.join("public/tmp"),
  relativePath: "public/uploads/",
  limits: { fileSize: 1024 * 1024 * 1 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/tmp");
    },
    filename: (req, file, cb) => {
      // a unique name for the file with the original extension
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
  }),
};
