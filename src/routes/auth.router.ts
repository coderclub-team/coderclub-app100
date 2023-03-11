// a /login route that will return a JWT token

import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import uniqueUserGaurd from "../middlewares/uniqueUserGaurd.middleware";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", uniqueUserGaurd, register);

export default authRouter;
