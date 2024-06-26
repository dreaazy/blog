// models/Category.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to the parent category, if any
    default: null
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the `updatedAt` field
categorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model('Category', categorySchema, "Categories");
module.exports = Category;
