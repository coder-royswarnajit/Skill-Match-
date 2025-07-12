const Discussion = require('../models/Discussion');
const Comment = require('../models/Comment');
const logger = require('../utils/logger');

// @desc    Get all discussions
// @route   GET /api/discussions
// @access  Public
const getDiscussions = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      sort = 'latest' 
    } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'popular':
        sortOption = { likeCount: -1, createdAt: -1 };
        break;
      case 'views':
        sortOption = { views: -1, createdAt: -1 };
        break;
      case 'latest':
      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const discussions = await Discussion.find(query)
      .populate('author', 'firstName lastName university major')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Add like count to each discussion
    discussions.forEach(discussion => {
      discussion.likeCount = discussion.likes.length;
    });

    const total = await Discussion.countDocuments(query);

    res.json({
      success: true,
      data: {
        discussions,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get discussions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single discussion
// @route   GET /api/discussions/:id
// @access  Public
const getDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findById(id)
      .populate('author', 'firstName lastName university major')
      .populate('likes', 'firstName lastName');

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Increment view count
    discussion.views += 1;
    await discussion.save();

    // Get comments
    const comments = await Comment.find({ discussion: id })
      .populate('author', 'firstName lastName university major')
      .populate('likes', 'firstName lastName')
      .sort({ createdAt: 1 });

    discussion.likeCount = discussion.likes.length;

    res.json({
      success: true,
      data: {
        discussion,
        comments
      }
    });
  } catch (error) {
    logger.error('Get discussion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create discussion
// @route   POST /api/discussions
// @access  Private
const createDiscussion = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const discussion = new Discussion({
      author: req.user.id,
      title,
      content,
      category,
      tags: tags || []
    });

    await discussion.save();

    const populatedDiscussion = await Discussion.findById(discussion._id)
      .populate('author', 'firstName lastName university major');

    res.status(201).json({
      success: true,
      message: 'Discussion created successfully',
      data: populatedDiscussion
    });
  } catch (error) {
    logger.error('Create discussion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update discussion
// @route   PUT /api/discussions/:id
// @access  Private
const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this discussion' });
    }

    discussion.title = title || discussion.title;
    discussion.content = content || discussion.content;
    discussion.category = category || discussion.category;
    discussion.tags = tags || discussion.tags;

    await discussion.save();

    const updatedDiscussion = await Discussion.findById(id)
      .populate('author', 'firstName lastName university major');

    res.json({
      success: true,
      message: 'Discussion updated successfully',
      data: updatedDiscussion
    });
  } catch (error) {
    logger.error('Update discussion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete discussion
// @route   DELETE /api/discussions/:id
// @access  Private
const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this discussion' });
    }

    // Delete associated comments
    await Comment.deleteMany({ discussion: id });

    await Discussion.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Discussion deleted successfully'
    });
  } catch (error) {
    logger.error('Delete discussion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Like/unlike discussion
// @route   POST /api/discussions/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const likeIndex = discussion.likes.indexOf(req.user.id);

    if (likeIndex > -1) {
      // Unlike
      discussion.likes.splice(likeIndex, 1);
    } else {
      // Like
      discussion.likes.push(req.user.id);
    }

    await discussion.save();

    res.json({
      success: true,
      message: likeIndex > -1 ? 'Discussion unliked' : 'Discussion liked',
      data: {
        likeCount: discussion.likes.length,
        isLiked: likeIndex === -1
      }
    });
  } catch (error) {
    logger.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add comment
// @route   POST /api/discussions/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, parentComment } = req.body;

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const comment = new Comment({
      discussion: id,
      author: req.user.id,
      content,
      parentComment: parentComment || null
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'firstName lastName university major');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: populatedComment
    });
  } catch (error) {
    logger.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDiscussions,
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  toggleLike,
  addComment
}; 