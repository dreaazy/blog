// routes/commentRoutes.js

const express = require('express');
const {
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment
} = require('../controllers/commentController');
const authenticate = require('../middleware/authenticate'); // Assuming you have an authentication middleware

const router = express.Router();

// Create a new comment
router.post('/', authenticate, createComment);

// Get all comments for a post
router.get('/post/:postId', getCommentsByPostId);

// Get a single comment by ID
router.get('/:id', getCommentById);

// Update a comment
router.put('/:id', authenticate, updateComment);

// Delete a comment
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
