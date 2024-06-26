// controllers/categoryController.js

const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, parentId } = req.body;

    const newCategory = new Category({
      name,
      description,
      parentId
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parentId', 'name');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parentId', 'name');
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, parentId } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;
    category.description = description;
    category.parentId = parentId;
    category.updatedAt = Date.now();

    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.remove();

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
