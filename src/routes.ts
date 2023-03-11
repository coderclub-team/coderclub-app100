import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User.model";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, "secret");
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { LoginName: req.body.username },
    });
    if (!user) throw new Error("User not found");
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) throw new Error("Invalid password");
    const token = jwt.sign({ id: user.id }, "secret");
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
