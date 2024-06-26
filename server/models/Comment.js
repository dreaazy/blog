// models/Comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',  // Reference to the parent comment, if any
    default: null
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',  // Reference to the post
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user who authored the comment
    required: true
  },
  content: {
    type: String,
    required: true
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
commentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Comment = mongoose.model('Comment', commentSchema, "Comments");
module.exports = Comment;
