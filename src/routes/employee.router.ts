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

const employeeRouter = Router();
employeeRouter.get("/", getAllEmployees);
employeeRouter.get("/:EmployeeID", getEmployeeById);
employeeRouter.post("/", authGaurd, createEmployee);
employeeRouter.put(
  "/:EmployeeID",
  authGaurd,

  updateEmployee
);
employeeRouter.delete("/:EmployeeID", deleteEmployee);
export default employeeRouter;
