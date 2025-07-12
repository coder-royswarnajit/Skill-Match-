// C:\Users\User\Desktop\skillswappro\backend\src\controllers\profileController.js

const Profile = require('../models/Profile');
const User = require('../models/User');

// Get current user's profile
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user.id })
      .populate('userId', 'firstName lastName email university major studentId');

    if (!profile) {
      // Create default profile if it doesn't exist
      profile = new Profile({
        userId: req.user.id,
        bio: '',
        location: '',
        skillsOffered: [],
        skillsWanted: []
      });
      await profile.save();

      profile = await Profile.findOne({ userId: req.user.id })
        .populate('userId', 'firstName lastName email university major studentId');
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// Update current user's profile
const updateProfile = async (req, res) => {
  try {
    const {
      bio,
      location,
      city,
      state,
      githubProfile,
      linkedinProfile,
      portfolio,
      currentSemester,
      cgpa,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic
    } = req.body;

    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = new Profile({ userId: req.user.id });
    }

    // Update profile fields
    if (bio !== undefined) profile.bio = bio;
    if (location !== undefined) profile.location = location;
    if (city !== undefined) profile.city = city;
    if (state !== undefined) profile.state = state;
    if (githubProfile !== undefined) profile.githubProfile = githubProfile;
    if (linkedinProfile !== undefined) profile.linkedinProfile = linkedinProfile;
    if (portfolio !== undefined) profile.portfolio = portfolio;
    if (currentSemester !== undefined) profile.currentSemester = currentSemester;
    if (cgpa !== undefined) profile.cgpa = cgpa;
    if (skillsOffered !== undefined) profile.skillsOffered = skillsOffered;
    if (skillsWanted !== undefined) profile.skillsWanted = skillsWanted;
    if (availability !== undefined) profile.availability = availability;
    if (isPublic !== undefined) profile.isPublic = isPublic;

    await profile.save();

    const updatedProfile = await Profile.findOne({ userId: req.user.id })
      .populate('userId', 'firstName lastName email university major studentId');

    res.json({
      success: true,
      data: updatedProfile
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

// Get profile by user ID
const getProfileById = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ userId, isPublic: true })
      .populate('userId', 'firstName lastName email university major studentId');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// Search profiles
const searchProfiles = async (req, res) => {
  try {
    const {
      query,
      skill,
      location,
      university,
      category,
      level,
      page = 1,
      limit = 10
    } = req.query;

    const skip = (page - 1) * limit;
    let searchQuery = { isPublic: true };

    // Text search
    if (query) {
      searchQuery.$text = { $search: query };
    }

    // Skill filter
    if (skill) {
      searchQuery['skillsOffered.name'] = { $regex: skill, $options: 'i' };
    }

    // Location filter
    if (location) {
      searchQuery.$or = [
        { location: { $regex: location, $options: 'i' } },
        { city: { $regex: location, $options: 'i' } },
        { state: { $regex: location, $options: 'i' } }
      ];
    }

    // University filter: Improved to query User model first for efficiency
    if (university) {
      const usersByUniversity = await User.find({ university: { $regex: university, $options: 'i' } }).select('_id');
      const userIds = usersByUniversity.map(user => user._id);
      searchQuery.userId = { $in: userIds };
    }

    // Category filter
    if (category) {
      searchQuery['skillsOffered.category'] = category;
    }

    // Level filter
    if (level) {
      searchQuery['skillsOffered.level'] = level;
    }

    const profiles = await Profile.find(searchQuery)
      .populate('userId', 'firstName lastName email university major studentId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Profile.countDocuments(searchQuery);

    res.json({
      success: true,
      data: profiles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching profiles:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching profiles',
      error: error.message
    });
  }
};

// Get profiles by skill
const getProfilesBySkill = async (req, res) => {
  try {
    const { skillName } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const profiles = await Profile.find({
      'skillsOffered.name': { $regex: skillName, $options: 'i' },
      isPublic: true
    })
      .populate('userId', 'firstName lastName email university major studentId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Profile.countDocuments({
      'skillsOffered.name': { $regex: skillName, $options: 'i' },
      isPublic: true
    });

    res.json({
      success: true,
      data: profiles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching profiles by skill:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profiles by skill',
      error: error.message
    });
  }
};

// Get profiles by location
const getProfilesByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const profiles = await Profile.find({
      $or: [
        { location: { $regex: location, $options: 'i' } },
        { city: { $regex: location, $options: 'i' } },
        { state: { $regex: location, $options: 'i' } }
      ],
      isPublic: true
    })
      .populate('userId', 'firstName lastName email university major studentId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Profile.countDocuments({
      $or: [
        { location: { $regex: location, $options: 'i' } },
        { city: { $regex: location, $options: 'i' } },
        { state: { $regex: location, $options: 'i' } }
      ],
      isPublic: true
    });

    res.json({
      success: true,
      data: profiles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching profiles by location:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profiles by location',
      error: error.message
    });
  }
};

// Get profiles by university
const getProfilesByUniversity = async (req, res) => {
  try {
    const { university } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // A more efficient way to query by populated university field
    const usersByUniversity = await User.find({ university: { $regex: university, $options: 'i' } }).select('_id');
    const userIds = usersByUniversity.map(user => user._id);

    const profiles = await Profile.find({
      isPublic: true,
      userId: { $in: userIds }
    })
      .populate('userId', 'firstName lastName email university major studentId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Profile.countDocuments({
      isPublic: true,
      userId: { $in: userIds }
    });

    res.json({
      success: true,
      data: profiles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching profiles by university:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profiles by university',
      error: error.message
    });
  }
};

// Get recommended users
const getRecommendedUsers = async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ userId: req.user.id });

    if (!userProfile || !userProfile.skillsWanted.length) {
      // Return random profiles if no skills wanted
      const profiles = await Profile.find({
        userId: { $ne: req.user.id },
        isPublic: true
      })
        .populate('userId', 'firstName lastName email university major studentId')
        .limit(10)
        .sort({ createdAt: -1 });

      return res.json({
        success: true,
        data: profiles
      });
    }

    // Find users who can teach skills the current user wants to learn
    const wantedSkills = userProfile.skillsWanted.map(skill => skill.name);

    const profiles = await Profile.find({
      userId: { $ne: req.user.id },
      isPublic: true,
      'skillsOffered.name': { $in: wantedSkills }
    })
      .populate('userId', 'firstName lastName email university major studentId')
      .limit(10)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: profiles
    });
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommended users',
      error: error.message
    });
  }
};

// Update availability
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.availability = availability;
    await profile.save();

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating availability',
      error: error.message
    });
  }
};

// Add achievement
const addAchievement = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.achievements.push({
      title,
      description,
      type,
      date: new Date()
    });

    await profile.save();

    res.json({
      success: true,
      data: profile.achievements
    });
  } catch (error) {
    console.error('Error adding achievement:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding achievement',
      error: error.message
    });
  }
};

// Export all controller functions as an object
module.exports = {
  getProfile,
  updateProfile,
  getProfileById,
  searchProfiles,
  getProfilesBySkill,
  getProfilesByLocation,
  getProfilesByUniversity,
  getRecommendedUsers,
  updateAvailability,
  addAchievement
};
