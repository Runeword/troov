import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

// Register new user
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Throw error if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Create jwt
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Send jwt to the client
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
