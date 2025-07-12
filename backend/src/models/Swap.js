const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedSkill: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true
    }
  },
  offeredSkill: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 500,
    trim: true
  },
  scheduledDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  requesterRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 300,
      trim: true
    },
    submittedAt: {
      type: Date
    }
  },
  recipientRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 300,
      trim: true
    },
    submittedAt: {
      type: Date
    }
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

// Indexes for efficient queries
swapSchema.index({ requester: 1, status: 1 });
swapSchema.index({ recipient: 1, status: 1 });
swapSchema.index({ status: 1, createdAt: -1 });

// Virtual for checking if swap is expired (30 days)
swapSchema.virtual('isExpired').get(function() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return this.createdAt < thirtyDaysAgo && this.status === 'pending';
});

// Pre-save middleware to update completedDate when status changes to completed
swapSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.completedDate) {
    this.completedDate = new Date();
  }
  next();
});

module.exports = mongoose.model('Swap', swapSchema); 