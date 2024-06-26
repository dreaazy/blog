// routes/categoryRoutes.js

const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const authenticate = require('../middleware/authenticate'); // Assuming you have an authentication middleware

const router = express.Router();

// Create a new category
router.post('/', authenticate, createCategory);

// Get all categories
router.get('/', getCategories);

// Get a single category by ID
router.get('/:id', getCategoryById);

// Update a category
router.put('/:id', authenticate, updateCategory);

// Delete a category
router.delete('/:id', authenticate, deleteCategory);

module.exports = router;
