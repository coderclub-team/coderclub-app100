import express from "express";
import { Banner, ContactForm, FAQ, Walkthrough } from "../models/cms.model";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const router = express.Router();

// Define your routes here
router.get("/faqs", async (req, res, next) => {
  try {
    const faqs = await FAQ.findAll({
      order: ["SortOrder"],
    });
    res.status(200).json(faqs);
  } catch (error) {
    next(error);
  }
});

router.get("/banners", async (req, res, next) => {
  try {
    const banners = await Banner.findAll({
      order: ["SortOrder"],
    });
    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
});

router.get("/walkthroughs", async (req, res, next) => {
  try {
    const banners = await Walkthrough.findAll({
      order: ["SortOrder"],
    });
    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
});

router.post("/contact", async (req, res, next) => {
  const { Name, Email, Message } = req.body;

  const contact = await ContactForm.findOne({
    where: {
      Email,
      Message,
    },
  });
  if (contact) {
   return res.status(400).json({ message: "You have already submitted this form" });
  }

  if (!Name || !Email || !Message || !emailRegex.test(Email)) {
    return res.status(400).json({ message: "You have already submitted this form" });
    res
      .status(400)
      .json({ message: "Please enter Name, Email and Message fields" });
  }

  try {
    const contact = await ContactForm.create({
      Name,
      Email,
      Message,
    });
    return res.status(400).json({ message: "You have already submitted this form" });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

export default router;
