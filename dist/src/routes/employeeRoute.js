"use strict";
// router for employee
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const authGaurd_1 = __importDefault(require("../middlewares/authGaurd"));
const upload_1 = require("../middlewares/upload");
const employeeRouter = (0, express_1.Router)();
employeeRouter.get("/", employeeController_1.getAllEmployees);
employeeRouter.get("/:EmployeeID", employeeController_1.getEmployeeById);
employeeRouter.post("/", authGaurd_1.default, upload_1.uploadEmployeePhoto, employeeController_1.createEmployee);
employeeRouter.put("/:EmployeeID", authGaurd_1.default, upload_1.uploadEmployeePhoto, employeeController_1.updateEmployee);
employeeRouter.delete("/:EmployeeID", employeeController_1.deleteEmployee);
exports.default = employeeRouter;
