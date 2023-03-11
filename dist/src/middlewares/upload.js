"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadEmployeePhoto = exports.multerErrorHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../../config");
// handle multer error and send it to the client
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        res.status(400).json({
            message: err.message,
        });
    }
    else if (err) {
        res.status(400).json({
            message: err.message,
        });
    }
    else {
        next();
    }
};
exports.multerErrorHandler = multerErrorHandler;
exports.uploadEmployeePhoto = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config_1.employeeImageUploadOptions.relativePath);
        },
        filename: (req, file, cb) => {
            // a unique name for the file with the original extension
            cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
        },
        // limits: { fileSize: 1024 * 1024 * 5 },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: { fileSize: 1024 * 1024 * 1 },
    preservePath: true,
}).single("file");
