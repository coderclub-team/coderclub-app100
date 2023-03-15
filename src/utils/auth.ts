import jwt from "jsonwebtoken";

import User from "../models/User.model";

export const generateToken = (user: User) => {
  const data = user.get({
    plain: true,
  });

  const JWT_SECRET = process.env.JWT_SECRET || "Asdf@123$";
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
