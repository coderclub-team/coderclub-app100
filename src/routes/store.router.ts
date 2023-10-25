import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import {
  findAll,
  findOneById,
  createCustomerRequest,
  deleteById,
} from "../controllers/customer.controller";
import StoreMaster from "../models/store-master.model";
import { loginRequest, registerRequest, resetPassword, resetPasswordRequest, verifyRegistration } from "../controllers/lineman.controller";
import multer from "multer";
import { allRoutes } from "../controllers/route.controller";


router.use(
  "/:store_id",
  async (req: Request, res: Response, next: NextFunction) => {
   try {
    const store = await StoreMaster.findByPk(req.params.store_id);
    if (store === null) throw new Error("Store not found");
    next()
   } catch (error) {
    next(error);
   }

  }
);


// lineman

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/tmp");
    },
    filename: (req, file, cb) => {
      // a unique name for the file with the original extension
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
  
  }),
  limits: { fileSize: 2024 * 1024 * 2 },
  dest: "public/tmp",
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
});


router.post(
  "/:store_id/lineman/register/request",
  upload.fields([
    { name: "aadhaar_front" },
    { name: "aadhaar_back" },
    { name: "driving_licence_front" },
    { name: "driving_licence_back" },
  ]),
  registerRequest
);
router.post("/:store_id/lineman/register/request/confirm",verifyRegistration)
router.post("/:store_id/lineman/password/reset/request",resetPasswordRequest)
router.post("/:store_id/lineman/password/reset/request/confirm",resetPassword)
router.post("/:store_id/lineman/login/request",loginRequest)



// customers (shops)
router.get("/:store_id/customers", findAll);
router.get("/:store_id/customers/:customer_id", findOneById);
router.post("/:store_id/customers/create/request", createCustomerRequest);
router.delete("/:store_id/customers/:customer_id",deleteById);



// routes
router.get("/:store_id/routes/all/request", allRoutes);
router.get("/:store_id/routes/:route_id", allRoutes);
export default router;
