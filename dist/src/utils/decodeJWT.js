"use strict";
// import { NextFunction, Request, Response } from "express";
// import { verify } from "jsonwebtoken";
// import User from "../models/User.model";
// export default (req: Request) => {
//   // Get the token from the Authorization header
//   const authHeader = req.header("Authorization");
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) {
//     throw new Error("No token, authorization denied");
//   }
//   try {
//     const decoded = verify(token, process.env.JWT_SECRET!);
//     const { ...user } = decoded as User;
//     return user;
//   } catch (error) {
//     throw new Error("Token is not valid");
//   }
// };
// //
