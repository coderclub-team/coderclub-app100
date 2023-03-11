import { SequelizeOptions } from "sequelize-typescript";
import path from "node:path";

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
