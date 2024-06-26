// controllers/commentController.js

const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { postId, content, parentId } = req.body;
    const author = req.user.userId; // Assuming req.user is set by authentication middleware

    const newComment = new Comment({
      postId,
      content,
      author,
      parentId
    });

    await newComment.save();

    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments for a post
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
                                  .populate('author', 'name')
                                  .populate('parentId', 'content');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
                                 .populate('author', 'name')
                                 .populate('parentId', 'content');
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.content = content;
    comment.updatedAt = Date.now();

    await comment.save();

    res.status(200).json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await comment.remove();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
