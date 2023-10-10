import { NextFunction, Request, Response } from "express";
import LinemanModel from "../models/lineman.model";
import zod, { ZodError } from "zod";
import path from "path";
import fs from "node:fs";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded.");
    } else {
      Object.entries(req.files).forEach(([key, value]) => {
        req.body[`${key}_tmp`] = value[0].path;
        req.body[key] = path.join(path.join("lineman/docs"), value[0].filename);
      });
    }
  }

  try {
    const schema = zod
      .object({
        store_id: zod.string().min(1).max(50),
        name: zod.string().min(3).max(50),
        phone: zod.string().min(3).max(50),
        email: zod.string().email(),
        address: zod.string().min(3).max(50).optional(),
        city: zod.string().min(3).max(50).optional(),
        state: zod.string().min(3).max(50).optional(),
        pincode: zod.string().min(3).max(50).optional(),
        password: zod
          .string()
          .min(3)
          .max(50)
          .regex(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            "Password must contain atleast one number and one special character"
          ),
        AadhaarFrontFilePath: zod.string().optional(),
        AadhaarBackFilePath: zod.string().optional(),
        DrivingLicenceFrontFilePath: zod.string().optional(),
        DrivingLicenceBackFilePath: zod.string().optional(),
      })
      .parse({
        ...req.body,
        store_id: req.params.store_id,
        AadhaarFrontFilePath: req.body.aadhaar_front,
        AadhaarBackFilePath: req.body.aadhaar_back,
        DrivingLicenceFrontFilePath: req.body.driving_licence_front,
        DrivingLicenceBackFilePath: req.body.driving_licence_back,
      });

    const lineman = await LinemanModel.create({
      LineManName: schema.name,
      Address: schema.address,
      City: schema.city,
      State: schema.state,
      PinCode: schema.pincode,
      MobileNo: schema.phone,
      EmailAddress: schema.email,
      StoreGUID: schema.store_id,
      linemanID: "LINAM123",
      createdDate: new Date().toISOString(),
      Password: schema.password,
      AadhaarFrontFilePath: schema.AadhaarFrontFilePath,
      AadhaarBackFilePath: schema.AadhaarBackFilePath,
      DrivingLicenceFrontFilePath: schema.DrivingLicenceFrontFilePath,
      DrivingLicenceBackFilePath: schema.DrivingLicenceBackFilePath,
    });
    if (lineman) {
        if (req.body.aadhaar_front_tmp) {
          fs.rename(
            req.body.aadhaar_front_tmp,
            path.join("public", req.body.aadhaar_front),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          )
        }
        if (req.body.aadhaar_back_tmp) {
          fs.rename(
            req.body.aadhaar_back_tmp,
            path.join("public", req.body.aadhaar_back),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
        if (req.body.driving_licence_front_tmp) {
          fs.rename(
            req.body.driving_licence_front_tmp,
            path.join("public", req.body.driving_licence_front),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
        if (req.body.driving_licence_back_tmp) {
          fs.rename(
            req.body.driving_licence_back_tmp,
            path.join("public", req.body.driving_licence_back),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }

      return res.status(201).json({
        name: "hi",
      });
    }

    res.send("ok");
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.errors[0].path[0] + " " + error.errors[0].message,
      });
    }
    if (req.body.aadhaar_front) {
      fs.unlink(req.body.aadhaar_front, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (req.body.aadhaar_back) {
      fs.unlink(req.body.aadhaar_back, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (req.body.driving_licence_front) {
      fs.unlink(req.body.driving_licence_front, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (req.body.driving_licence_back) {
      fs.unlink(req.body.driving_licence_back, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    next(error);
  }
};
