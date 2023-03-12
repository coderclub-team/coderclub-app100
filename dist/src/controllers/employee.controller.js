"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const Employee_model_1 = __importDefault(require("../models/Employee.model"));
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const decodeJWT_1 = __importDefault(require("../utils/decodeJWT"));
const config_1 = require("../../config");
multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        // a unique name for the file with the original extension
        cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
});
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee_model_1.default.findAll({
            attributes: {
                exclude: [
                    "CreatedGUID",
                    "ModifiedGUID",
                    "CreatedDate",
                    "ModifiedDate",
                    // "DeletedDate",
                ],
            },
        }).then((employees) => {
            employees.forEach((employee) => {
                const photoPath = employee.getDataValue("PhotoPath");
                if (photoPath) {
                    employee.PhotoPath = node_path_1.default.join(req.protocol + "://" + req.get("host"), photoPath);
                }
            });
            return employees;
        });
        res.send(employees);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { EmployeeID } = req.params;
    try {
        const employee = yield Employee_model_1.default.findByPk(EmployeeID, {
            attributes: {
                exclude: [
                    "CreatedGUID",
                    "ModifiedGUID",
                    "CreatedDate",
                    "ModifiedDate",
                    "DeletedDate",
                ],
            },
        }).then((employee) => {
            if (employee === null || employee === void 0 ? void 0 : employee.PhotoPath)
                employee.PhotoPath = node_path_1.default.join(req.protocol + "://" + req.get("host"), employee === null || employee === void 0 ? void 0 : employee.PhotoPath);
            return employee;
        });
        if (!employee) {
            return res.status(400).json({
                message: "Employee not found!",
            });
        }
        return res.status(200).json({
            message: "Employee fetched successfully!",
            employee,
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getEmployeeById = getEmployeeById;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.body.user.UserGUID) {
        req.body.CreatedGUID = req.body.user.UserGUID;
    }
    else {
        req.body.CreatedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    }
    if (req.file)
        req.body.PhotoPath = node_path_1.default.join(config_1.employeeImageUploadOptions.directory, (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename);
    try {
        const employee = yield Employee_model_1.default.create(req.body);
        return res.status(201).json({
            message: "Employee created successfully!",
            employee,
        });
    }
    catch (error) {
        console.log("employeeController.ts: error: ", error.message);
        return res.status(500).json(error);
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { EmployeeID } = req.params;
    req.body.ModifiedGUID = (0, decodeJWT_1.default)(req).UserGUID;
    if (req.file)
        req.body.PhotoPath = node_path_1.default.join(config_1.employeeImageUploadOptions.directory, (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.filename);
    try {
        const employee = yield Employee_model_1.default.findByPk(EmployeeID);
        if (!employee) {
            return res.status(400).json({
                message: "Employee not found!",
            });
        }
        yield employee.update(req.body, {
            exclude: [
                "EmployeeID",
                "CreatedGUID",
                "CreatedDate",
                "DeletedDate",
                "MobileNo",
                "EmployeeGUID",
            ],
        });
        return res.status(200).json({
            message: "Employee updated successfully!",
            employee,
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { EmployeeID } = req.params;
    try {
        const employee = yield Employee_model_1.default.findByPk(EmployeeID);
        if (!employee) {
            return res.status(400).json({
                message: "Employee not found!",
            });
        }
        const fnDeleteEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
            yield employee.destroy().then(() => {
                if (node_fs_1.default.existsSync(employee.PhotoPath)) {
                    node_fs_1.default.unlink(employee.PhotoPath, (err) => {
                        if (err) {
                            console.log("employeeController.ts: error: ", err.message);
                        }
                    });
                }
            });
        });
        if (!Employee_model_1.default.options.paranoid) {
            const fname = employee.PhotoPath.split("/").pop();
            if (fname) {
                let filepath = config_1.employeeImageUploadOptions.relativePath + "/" + fname;
                if (node_fs_1.default.existsSync(filepath)) {
                    node_fs_1.default.unlink(filepath, (err) => {
                        if (err) {
                            console.log("employeeController.ts: error: ", err.message);
                            return res.status(500).json({
                                message: "Employee image not deleted!",
                                error: err,
                            });
                        }
                        fnDeleteEmployee();
                    });
                }
                else {
                    console.log("employeeController.ts: error: ", "File not found!");
                }
            }
        }
        else {
            fnDeleteEmployee();
        }
        return res.status(200).json({
            message: "Employee deleted successfully!",
            employee,
        });
    }
    catch (error) {
        console.log("employeeController.ts: error: ", error.message);
        return res.status(500).json(error);
    }
});
exports.deleteEmployee = deleteEmployee;
