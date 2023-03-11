"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeImageUploadOptions = exports.sequelizeConnectionOptions = void 0;
const node_path_1 = __importDefault(require("node:path"));
exports.sequelizeConnectionOptions = {
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
exports.employeeImageUploadOptions = {
    directory: node_path_1.default.join("uploads"),
    relativePath: "public/uploads/",
    limits: { fileSize: 1024 * 1024 * 1 },
};
