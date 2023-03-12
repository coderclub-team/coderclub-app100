"use strict";
// router for employee
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const authGaurd_middleware_1 = __importDefault(require("../middlewares/authGaurd.middleware"));
const employeeRouter = (0, express_1.Router)();
employeeRouter.get("/", employee_controller_1.getAllEmployees);
employeeRouter.get("/:EmployeeID", employee_controller_1.getEmployeeById);
employeeRouter.post("/", authGaurd_middleware_1.default, employee_controller_1.createEmployee);
employeeRouter.put("/:EmployeeID", authGaurd_middleware_1.default, employee_controller_1.updateEmployee);
employeeRouter.delete("/:EmployeeID", employee_controller_1.deleteEmployee);
exports.default = employeeRouter;
