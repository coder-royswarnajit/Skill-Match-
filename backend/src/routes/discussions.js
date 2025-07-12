const express = require('express');
const { auth } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const Joi = require('joi');
const {
  getDiscussions,
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  toggleLike,
  addComment
} = require('../controllers/discussionController');

const router = express.Router();

// Validation schemas
const discussionSchemas = {
  createDiscussion: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    content: Joi.string().min(10).max(5000).required(),
    category: Joi.string().valid(
      'general', 'classes', 'career', 'projects', 
      'internships', 'research', 'events', 'tools', 'other'
    ).required(),
    tags: Joi.array().items(Joi.string().max(20)).max(10).optional()
  }),
  
  updateDiscussion: Joi.object({
    title: Joi.string().min(5).max(200).optional(),
    content: Joi.string().min(10).max(5000).optional(),
    category: Joi.string().valid(
      'general', 'classes', 'career', 'projects', 
      'internships', 'research', 'events', 'tools', 'other'
    ).optional(),
    tags: Joi.array().items(Joi.string().max(20)).max(10).optional()
  }),
  
  addComment: Joi.object({
    content: Joi.string().min(1).max(2000).required(),
    parentComment: Joi.string().optional()
  })
};

// Public routes
router.get('/', getDiscussions);
router.get('/:id', getDiscussion);

// Protected routes
router.use(auth);

router.post('/', validate(discussionSchemas.createDiscussion), createDiscussion);
router.put('/:id', validate(discussionSchemas.updateDiscussion), updateDiscussion);
router.delete('/:id', deleteDiscussion);
router.post('/:id/like', toggleLike);
router.post('/:id/comments', validate(discussionSchemas.addComment), addComment);

module.exports = router; 