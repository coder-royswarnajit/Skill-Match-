const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  messageType: {
    type: String,
    enum: ['text', 'file', 'image', 'system'],
    default: 'text'
  },
  fileUrl: {
    type: String
  },
  fileName: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  // For moderation
  isFlagged: {
    type: Boolean,
    default: false
  },
  flaggedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  flagReason: {
    type: String,
    enum: ['spam', 'inappropriate', 'harassment', 'other']
  },
  flaggedAt: {
    type: Date
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deletedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const chatSchema = new mongoose.Schema({
  swapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Swap',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [messageSchema],
  // Chat settings
  isActive: {
    type: Boolean,
    default: true
  },
  // Study session tracking
  studySessions: [{
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date
    },
    duration: {
      type: Number // in minutes
    },
    topic: {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  // Guidelines and rules
  guidelines: {
    agreedToGuidelines: {
      type: Boolean,
      default: false
    },
    agreedAt: {
      type: Date
    },
    lastReminder: {
      type: Date
    }
  },
  // Moderation
  warnings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: {
      type: String,
      required: true
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    issuedAt: {
      type: Date,
      default: Date.now
    },
    acknowledged: {
      type: Boolean,
      default: false
    }
  }],
  // Chat statistics
  stats: {
    totalMessages: {
      type: Number,
      default: 0
    },
    totalStudyTime: {
      type: Number,
      default: 0 // in minutes
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
chatSchema.index({ swapId: 1 });
chatSchema.index({ participants: 1 });
chatSchema.index({ 'stats.lastActivity': -1 });

// Virtual for unread message count
chatSchema.virtual('unreadCount').get(function() {
  return this.messages.filter(msg => !msg.isRead).length;
});

// Methods
chatSchema.methods.addMessage = function(senderId, content, messageType = 'text', fileUrl = null, fileName = null) {
  const message = {
    sender: senderId,
    content,
    messageType,
    fileUrl,
    fileName
  };
  
  this.messages.push(message);
  this.stats.totalMessages += 1;
  this.stats.lastActivity = new Date();
  
  return this.save();
};

chatSchema.methods.markMessageAsRead = function(messageId, userId) {
  const message = this.messages.id(messageId);
  if (message && !message.isRead) {
    message.isRead = true;
    message.readAt = new Date();
    return this.save();
  }
  return Promise.resolve(this);
};

chatSchema.methods.flagMessage = function(messageId, flaggedBy, reason) {
  const message = this.messages.id(messageId);
  if (message) {
    message.isFlagged = true;
    message.flaggedBy = flaggedBy;
    message.flagReason = reason;
    message.flaggedAt = new Date();
    return this.save();
  }
  return Promise.resolve(this);
};

chatSchema.methods.addWarning = function(userId, reason, issuedBy) {
  this.warnings.push({
    userId,
    reason,
    issuedBy
  });
  return this.save();
};

chatSchema.methods.startStudySession = function(initiatedBy, topic) {
  this.studySessions.push({
    startTime: new Date(),
    topic,
    initiatedBy
  });
  return this.save();
};

chatSchema.methods.endStudySession = function(sessionId, notes = '') {
  const session = this.studySessions.id(sessionId);
  if (session && !session.endTime) {
    session.endTime = new Date();
    session.duration = Math.round((session.endTime - session.startTime) / (1000 * 60)); // minutes
    session.notes = notes;
    this.stats.totalStudyTime += session.duration;
    return this.save();
  }
  return Promise.resolve(this);
};

// Static methods
chatSchema.statics.findBySwapId = function(swapId) {
  return this.findOne({ swapId }).populate('participants', 'firstName lastName email');
};

chatSchema.statics.findByParticipant = function(userId) {
  return this.find({ participants: userId, isActive: true })
    .populate('participants', 'firstName lastName email')
    .populate('swapId', 'requestedSkill offeredSkill status')
    .sort({ 'stats.lastActivity': -1 });
};

module.exports = mongoose.model('Chat', chatSchema); 