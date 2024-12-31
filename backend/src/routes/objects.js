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

// Get a single object by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const object = await Object.findOne({
      _id: req.params.id,
      user: req.userData.userId,
    });
    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }
    res.json(object);
  } catch (error) {
    res.status(500).json({ message: "Error fetching object" });
  }
});

// Create a new object
router.post("/", auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const object = new Object({
      name,
      description,
      user: req.userData.userId,
    });
    await object.save();
    res.status(201).json(object);
  } catch (error) {
    res.status(500).json({ message: "Error creating object" });
  }
});

// Update an object
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const object = await Object.findOne({
      _id: req.params.id,
      user: req.userData.userId,
    });

    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }

    object.name = name;
    object.description = description;
    await object.save();

    res.json(object);
  } catch (error) {
    res.status(500).json({ message: "Error updating object" });
  }
});

// Delete an object
router.delete("/:id", auth, async (req, res) => {
  try {
    const result = await Object.deleteOne({
      _id: req.params.id,
      user: req.userData.userId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Object not found" });
    }
    res.json({ message: "Object deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting object" });
  }
});

export default router;
