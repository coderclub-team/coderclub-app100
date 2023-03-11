import jwt from "jsonwebtoken";

import User from "../models/User.model";

export const generateToken = (user: User) => {
  const { UserGUID, EmailAddress, LoginName } = user;
  return jwt.sign(
    { UserGUID, EmailAddress, LoginName },
    process.env.JWT_SECRET || "Asdf@1234",
    {
      expiresIn: "1d",
    }
  );
};
