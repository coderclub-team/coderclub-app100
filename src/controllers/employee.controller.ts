import { Request, Response } from "express";
import Employee from "../models/Employee.model";
import mutler from "multer";
import path from "node:path";
import fs from "node:fs";
import decodeJWT from "../utils/decodeJWT";
import { employeeImageUploadOptions } from "../../config";
mutler.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // a unique name for the file with the original extension
    cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll({
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
          employee.PhotoPath = path.join(
            req.protocol + "://" + req.get("host"),
            photoPath
          );
        }
      });
      return employees;
    });

    res.send(employees);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
export const getEmployeeById = async (req: Request, res: Response) => {
  const { EmployeeID } = req.params;
  try {
    const employee = await Employee.findByPk(EmployeeID, {
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
      if (employee?.PhotoPath)
        employee.PhotoPath = path.join(
          req.protocol + "://" + req.get("host"),
          employee?.PhotoPath
        );

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
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
export const createEmployee = async (req: Request, res: Response) => {
  if (req.body.user.UserGUID) {
    req.body.CreatedGUID = req.body.user.UserGUID;
  } else {
    req.body.CreatedGUID = decodeJWT(req).UserGUID;
  }

  if (req.file)
    req.body.PhotoPath = path.join(
      employeeImageUploadOptions.directory,
      req?.file?.filename
    );
  try {
    const employee = await Employee.create(req.body);
    return res.status(201).json({
      message: "Employee created successfully!",
      employee,
    });
  } catch (error: any) {
    console.log("employeeController.ts: error: ", error.message);
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
export const updateEmployee = async (req: Request, res: Response) => {
  const { EmployeeID } = req.params;
  req.body.ModifiedGUID = decodeJWT(req).UserGUID;
  if (req.file)
    req.body.PhotoPath = path.join(
      employeeImageUploadOptions.directory,
      req?.file?.filename
    );
  try {
    const employee = await Employee.findByPk(EmployeeID);
    if (!employee) {
      return res.status(400).json({
        message: "Employee not found!",
      });
    }

    await employee.update(req.body, {
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
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
export const deleteEmployee = async (req: Request, res: Response) => {
  const { EmployeeID } = req.params;
  try {
    const employee = await Employee.findByPk(EmployeeID);
    if (!employee) {
      return res.status(400).json({
        message: "Employee not found!",
      });
    }
    const fnDeleteEmployee = async () => {
      await employee.destroy().then(() => {
        if (fs.existsSync(employee.PhotoPath)) {
          fs.unlink(employee.PhotoPath, (err) => {
            if (err) {
              console.log("employeeController.ts: error: ", err.message);
            }
          });
        }
      });
    };
    if (!Employee.options.paranoid) {
      const fname = employee.PhotoPath.split("/").pop();
      if (fname) {
        let filepath = employeeImageUploadOptions.relativePath + "/" + fname;

        if (fs.existsSync(filepath)) {
          fs.unlink(filepath, (err) => {
            if (err) {
              console.log("employeeController.ts: error: ", err.message);
              return res.status(500).json({
                message: "Employee image not deleted!",
                error: err,
              });
            }
            fnDeleteEmployee();
          });
        } else {
          console.log("employeeController.ts: error: ", "File not found!");
        }
      }
    } else {
      fnDeleteEmployee();
    }

    return res.status(200).json({
      message: "Employee deleted successfully!",
      employee,
    });
  } catch (error: any) {
    console.log("employeeController.ts: error: ", error.message);
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
