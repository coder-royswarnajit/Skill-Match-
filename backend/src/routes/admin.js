const express = require('express');
const { adminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// User Management
router.get('/users', adminController.getUsers);
router.put('/users/:userId/ban', adminController.toggleUserBan);

// Skill Moderation
router.get('/skills/pending', adminController.getPendingSkills);
router.put('/skills/:skillId/approve', adminController.approveSkill);
router.put('/skills/:skillId/reject', adminController.rejectSkill);

// Swap Management
router.get('/swaps', adminController.getSwaps);

// Platform Notifications
router.post('/notifications', adminController.sendPlatformNotification);

// Reports
router.get('/reports', adminController.generateReport);

module.exports = router; 