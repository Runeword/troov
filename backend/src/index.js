/**
 * @module app
 * @description Main application entry point
 */

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import objectRoutes from "./routes/objects.js";

/**
 * Express application instance
 * @type {import('express').Application}
 */
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * MongoDB connection
 * @type {Promise<void>}
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/objects", objectRoutes);

/**
 * Global error handler
 * @param {Error} err - Error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
