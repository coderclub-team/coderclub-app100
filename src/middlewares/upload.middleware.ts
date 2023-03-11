import multer from "multer";
import path from "node:path";
import { employeeImageUploadOptions } from "../../config";

// handle multer error and send it to the client
export const multerErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      message: err.message,
    });
  } else if (err) {
    res.status(400).json({
      message: err.message,
    });
  } else {
    next();
  }
};

export const uploadEmployeePhoto = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, employeeImageUploadOptions.relativePath);
    },
    filename: (req, file, cb) => {
      // a unique name for the file with the original extension
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
    // limits: { fileSize: 1024 * 1024 * 5 },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: 1024 * 1024 * 1 },
  preservePath: true,
}).single("file");
