/**
 * @module routes/objects
 */

import express from "express";
import Object from "../models/object.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * Get all objects for the authenticated user
 * @route GET /api/objects
 * @authentication Required
 * @returns {Array<Object>} 200 - Array of objects
 * @throws {Error} 500 - Server error
 */
router.get("/", auth, async (req, res) => {
  try {
    const objects = await Object.find({ user: req.userData.userId });
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching objects" });
  }
});

/**
 * Get a single object by ID
 * @route GET /api/objects/:id
 * @authentication Required
 * @param {string} req.params.id - Object ID
 * @returns {Object} 200 - Object details
 * @throws {Error} 404 - Object not found
 * @throws {Error} 500 - Server error
 */
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

/**
 * Create a new object
 * @route POST /api/objects
 * @authentication Required
 * @param {Object} req.body
 * @param {string} req.body.name - Object name
 * @param {string} req.body.description - Object description
 * @returns {Object} 201 - Created object
 * @throws {Error} 500 - Server error
 */
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

/**
 * Update an object
 * @route PUT /api/objects/:id
 * @authentication Required
 * @param {string} req.params.id - Object ID
 * @param {Object} req.body
 * @param {string} [req.body.name] - Updated name
 * @param {string} [req.body.description] - Updated description
 * @returns {Object} 200 - Updated object
 * @throws {Error} 404 - Object not found
 * @throws {Error} 500 - Server error
 */
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

/**
 * Delete an object
 * @route DELETE /api/objects/:id
 * @authentication Required
 * @param {string} req.params.id - Object ID
 * @returns {Object} 200 - { message: "Object deleted" }
 * @throws {Error} 404 - Object not found
 * @throws {Error} 500 - Server error
 */
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
