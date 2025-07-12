const User = require('../models/User');
const Profile = require('../models/Profile');
const Swap = require('../models/Swap');
const Discussion = require('../models/Discussion');
const logger = require('../utils/logger');

// Get admin dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      bannedUsers,
      totalSwaps,
      pendingSwaps,
      completedSwaps,
      cancelledSwaps,
      totalDiscussions,
      pendingSkills
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isBanned: false }),
      User.countDocuments({ isBanned: true }),
      Swap.countDocuments(),
      Swap.countDocuments({ status: 'pending' }),
      Swap.countDocuments({ status: 'completed' }),
      Swap.countDocuments({ status: 'cancelled' }),
      Discussion.countDocuments(),
      Profile.countDocuments({ 'skillsOffered.status': 'pending' })
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        bannedUsers,
        totalSwaps,
        pendingSwaps,
        completedSwaps,
        cancelledSwaps,
        totalDiscussions,
        pendingSkills,
        successRate: totalSwaps > 0 ? Math.round((completedSwaps / totalSwaps) * 100) : 0
      }
    });
  } catch (error) {
    logger.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

// Get all users with pagination and filters
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, university } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.isBanned = status === 'banned';
    }

    if (university) {
      query.university = { $regex: university, $options: 'i' };
    }

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Ban/unban user
const toggleUserBan = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isBanned = !user.isBanned;
    if (user.isBanned && reason) {
      user.banReason = reason;
      user.bannedAt = new Date();
      user.bannedBy = req.user.id;
    } else {
      user.banReason = undefined;
      user.bannedAt = undefined;
      user.bannedBy = undefined;
    }

    await user.save();

    res.json({
      success: true,
      message: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully`,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isBanned: user.isBanned,
          banReason: user.banReason
        }
      }
    });
  } catch (error) {
    logger.error('Error toggling user ban:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: error.message
    });
  }
};

// Get pending skills for moderation
const getPendingSkills = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const profiles = await Profile.find({
      'skillsOffered.status': 'pending'
    })
      .populate('userId', 'firstName lastName email university')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const pendingSkills = [];
    profiles.forEach(profile => {
      profile.skillsOffered.forEach(skill => {
        if (skill.status === 'pending') {
          pendingSkills.push({
            id: skill._id,
            skillName: skill.name,
            description: skill.description,
            category: skill.category,
            level: skill.level,
            user: {
              id: profile.userId._id,
              name: `${profile.userId.firstName} ${profile.userId.lastName}`,
              email: profile.userId.email,
              university: profile.userId.university
            },
            submittedDate: skill.createdAt,
            profileId: profile._id
          });
        }
      });
    });

    const total = await Profile.countDocuments({
      'skillsOffered.status': 'pending'
    });

    res.json({
      success: true,
      data: pendingSkills,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching pending skills:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending skills',
      error: error.message
    });
  }
};

// Approve skill
const approveSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { profileId } = req.body;

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const skill = profile.skillsOffered.id(skillId);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    skill.status = 'approved';
    skill.approvedAt = new Date();
    skill.approvedBy = req.user.id;

    await profile.save();

    res.json({
      success: true,
      message: 'Skill approved successfully',
      data: { skillId }
    });
  } catch (error) {
    logger.error('Error approving skill:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving skill',
      error: error.message
    });
  }
};

// Reject skill
const rejectSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { profileId, reason } = req.body;

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const skill = profile.skillsOffered.id(skillId);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    skill.status = 'rejected';
    skill.rejectedAt = new Date();
    skill.rejectedBy = req.user.id;
    skill.rejectionReason = reason;

    await profile.save();

    res.json({
      success: true,
      message: 'Skill rejected successfully',
      data: { skillId }
    });
  } catch (error) {
    logger.error('Error rejecting skill:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting skill',
      error: error.message
    });
  }
};

// Get all swaps with filters
const getSwaps = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (status) {
      query.status = status;
    }

    const swaps = await Swap.find(query)
      .populate('senderId', 'firstName lastName email university')
      .populate('recipientId', 'firstName lastName email university')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Swap.countDocuments(query);

    res.json({
      success: true,
      data: swaps,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching swaps:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching swaps',
      error: error.message
    });
  }
};

// Send platform-wide notification
const sendPlatformNotification = async (req, res) => {
  try {
    const { title, message, type = 'info' } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Title and message are required'
      });
    }

    // Create notification record (you can implement a Notification model)
    const notification = {
      title,
      message,
      type,
      sentBy: req.user.id,
      sentAt: new Date(),
      isPlatformWide: true
    };

    // Here you would typically:
    // 1. Save to database
    // 2. Send to all active users via WebSocket/email
    // 3. Update user notification counts

    logger.info('Platform notification sent:', notification);

    res.json({
      success: true,
      message: 'Platform notification sent successfully',
      data: notification
    });
  } catch (error) {
    logger.error('Error sending platform notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending notification',
      error: error.message
    });
  }
};

// Generate and download reports
const generateReport = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    let reportData = {};

    switch (type) {
      case 'user-activity':
        reportData = await generateUserActivityReport(startDate, endDate);
        break;
      case 'swap-stats':
        reportData = await generateSwapStatsReport(startDate, endDate);
        break;
      case 'platform-overview':
        reportData = await generatePlatformOverviewReport(startDate, endDate);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    res.json({
      success: true,
      data: reportData
    });
  } catch (error) {
    logger.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating report',
      error: error.message
    });
  }
};

// Helper functions for report generation
const generateUserActivityReport = async (startDate, endDate) => {
  const query = {};
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const [newUsers, activeUsers, bannedUsers] = await Promise.all([
    User.countDocuments({ ...query, isBanned: false }),
    User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    User.countDocuments({ isBanned: true })
  ]);

  return {
    type: 'user-activity',
    period: { startDate, endDate },
    data: {
      newUsers,
      activeUsers,
      bannedUsers,
      totalUsers: newUsers + bannedUsers
    }
  };
};

const generateSwapStatsReport = async (startDate, endDate) => {
  const query = {};
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const [totalSwaps, pendingSwaps, completedSwaps, cancelledSwaps] = await Promise.all([
    Swap.countDocuments(query),
    Swap.countDocuments({ ...query, status: 'pending' }),
    Swap.countDocuments({ ...query, status: 'completed' }),
    Swap.countDocuments({ ...query, status: 'cancelled' })
  ]);

  return {
    type: 'swap-stats',
    period: { startDate, endDate },
    data: {
      totalSwaps,
      pendingSwaps,
      completedSwaps,
      cancelledSwaps,
      successRate: totalSwaps > 0 ? Math.round((completedSwaps / totalSwaps) * 100) : 0
    }
  };
};

const generatePlatformOverviewReport = async (startDate, endDate) => {
  const query = {};
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const [users, swaps, discussions, profiles] = await Promise.all([
    User.countDocuments(query),
    Swap.countDocuments(query),
    Discussion.countDocuments(query),
    Profile.countDocuments(query)
  ]);

  return {
    type: 'platform-overview',
    period: { startDate, endDate },
    data: {
      users,
      swaps,
      discussions,
      profiles
    }
  };
};

module.exports = {
  getDashboardStats,
  getUsers,
  toggleUserBan,
  getPendingSkills,
  approveSkill,
  rejectSkill,
  getSwaps,
  sendPlatformNotification,
  generateReport
}; 