const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  category: {
    type: String,
    enum: [
      'general',
      'classes',
      'career',
      'projects',
      'internships',
      'research',
      'events',
      'tools',
      'other'
    ],
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 20
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
discussionSchema.index({ 
  title: 'text', 
  content: 'text',
  tags: 'text'
});

// Virtual for like count
discussionSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Pre-save middleware to update updatedAt
discussionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Discussion', discussionSchema); 