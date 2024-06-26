// routes/postRoutes.js

const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const authenticate = require('../middleware/authenticate'); // Assuming you have an authentication middleware

const router = express.Router();

// Create a new post
router.post('/', authenticate, createPost);

// Get all posts
router.get('/', getPosts);

// Get a single post by ID
router.get('/:id', getPostById);

// Update a post
router.put('/:id', authenticate, updatePost);

// Delete a post
router.delete('/:id', authenticate, deletePost);

module.exports = router;
