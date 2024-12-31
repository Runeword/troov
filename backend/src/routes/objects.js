import express from "express";
import Object from "../models/object.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all objects for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const objects = await Object.find({ user: req.userData.userId });
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching objects" });
  }
});

export default router;
