import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// Register new user
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Send Bad Request code if user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // Sign JWT with a secret key
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "24h" },
    );

    // Send JWT to the client
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

// Login existing user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Send Unauthorized code if user does not exist in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Send Unauthorized code if password is incorrect
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Sign JWT with a secret key
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "24h" },
    );

    // Send JWT to the client
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
