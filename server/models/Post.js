// models/Post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming 'User' is the name of your User model
    required: true
  },
  categoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'  // Assuming 'Category' is the name of your Category model
  }],
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
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model('Post', postSchema, "Posts");
module.exports = Post;
