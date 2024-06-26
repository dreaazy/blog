// controllers/postController.js

const Post = require('../models/Post');
const Category = require('../models/Category');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const author = req.user.userId; // Assuming req.user is set by authentication middleware

    // Validate category IDs
    const validCategories = await Category.find({ _id: { $in: categoryIds } });
    if (validCategories.length !== categoryIds.length) {
      return res.status(400).json({ error: 'One or more category IDs are invalid' });
    }

    const newPost = new Post({
      title,
      content,
      author,
      categoryIds
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name').populate('categoryIds', 'name');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name').populate('categoryIds', 'name');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;

    // Validate category IDs
    const validCategories = await Category.find({ _id: { $in: categoryIds } });
    if (validCategories.length !== categoryIds.length) {
      return res.status(400).json({ error: 'One or more category IDs are invalid' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    post.categoryIds = categoryIds;
    post.updatedAt = Date.now();

    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.remove();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
