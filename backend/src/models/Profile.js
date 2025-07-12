const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 500,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  // Indian city/state support
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  profilePhoto: {
    type: String,
    default: null
  },
  skillsOffered: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: [
        'programming_languages',
        'web_development',
        'mobile_development',
        'data_science',
        'machine_learning',
        'cybersecurity',
        'cloud_computing',
        'devops',
        'database',
        'algorithms',
        'system_design',
        'networking',
        'game_development',
        'blockchain',
        'iot',
        'other'
      ],
      default: 'other'
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate'
    },
    // CS-specific fields
    projects: [{
      name: String,
      description: String,
      githubUrl: String
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: Date
    }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedAt: {
      type: Date
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rejectedAt: {
      type: Date
    },
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rejectionReason: {
      type: String,
      maxlength: 500
    }
  }],
  skillsWanted: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: [
        'programming_languages',
        'web_development',
        'mobile_development',
        'data_science',
        'machine_learning',
        'cybersecurity',
        'cloud_computing',
        'devops',
        'database',
        'algorithms',
        'system_design',
        'networking',
        'game_development',
        'blockchain',
        'iot',
        'other'
      ],
      default: 'other'
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    // Learning goals
    learningGoal: {
      type: String,
      enum: ['personal_project', 'academic', 'career_advancement', 'interview_prep', 'hackathon', 'other'],
      default: 'personal_project'
    }
  }],
  // CS-specific profile fields
  githubProfile: {
    type: String,
    trim: true
  },
  linkedinProfile: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  currentSemester: {
    type: Number,
    min: 1,
    max: 8
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  availability: {
    weekdays: {
      morning: { type: Boolean, default: false },
      afternoon: { type: Boolean, default: false },
      evening: { type: Boolean, default: false }
    },
    weekends: {
      morning: { type: Boolean, default: false },
      afternoon: { type: Boolean, default: false },
      evening: { type: Boolean, default: false }
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata'
    },
    // CS student specific availability
    examPeriods: [{
      startDate: Date,
      endDate: Date,
      description: String
    }],
    hackathonAvailability: {
      type: Boolean,
      default: true
    }
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  completedSwaps: {
    type: Number,
    default: 0
  },
  // CS-specific achievements
  achievements: [{
    title: String,
    description: String,
    date: Date,
    type: {
      type: String,
      enum: ['hackathon', 'competition', 'certification', 'project', 'other']
    }
  }],
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
profileSchema.index({ 
  'skillsOffered.name': 'text', 
  'skillsWanted.name': 'text',
  location: 'text',
  city: 'text',
  state: 'text',
  bio: 'text'
});

// Virtual for full name (populated from User)
profileSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Profile', profileSchema); 