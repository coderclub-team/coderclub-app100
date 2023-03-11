// router for employee

import { Router } from "express";
import multer from "multer";

import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employee.controller";
import authGaurd from "../middlewares/authGaurd.middleware";
import { uploadEmployeePhoto } from "../middlewares/upload.middleware";

const employeeRouter = Router();
employeeRouter.get("/", getAllEmployees);
employeeRouter.get("/:EmployeeID", getEmployeeById);
employeeRouter.post("/", authGaurd, uploadEmployeePhoto, createEmployee);
employeeRouter.put(
  "/:EmployeeID",
  authGaurd,
  uploadEmployeePhoto,
  updateEmployee
);
employeeRouter.delete("/:EmployeeID", deleteEmployee);
export default employeeRouter;
