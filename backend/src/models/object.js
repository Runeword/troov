/**
 * @module models/object
 */

import mongoose from "mongoose";

/**
 * Object Schema Definition
 * @typedef {Object} ObjectSchema
 * @property {string} name - Name of the object
 * @property {string} description - Description of the object
 * @property {mongoose.Types.ObjectId} user - Reference to the user who owns this object
 * @property {Date} createdAt - Timestamp of object creation
 * @property {Date} updatedAt - Timestamp of object update
 */
const objectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
objectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Object = mongoose.model("Object", objectSchema);
export default Object;
