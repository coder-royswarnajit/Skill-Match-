// C:\Users\User\Desktop\skillswappro\backend\src\routes\profile.js
const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const profileController = require('../controllers/profileController');

// Search profiles
router.get('/search', profileController.searchProfiles);
// Get profiles by skill
router.get('/skill/:skillName', profileController.getProfilesBySkill);
// Get profiles by location
router.get('/location/:location', profileController.getProfilesByLocation);
// Get profiles by university
router.get('/university/:university', profileController.getProfilesByUniversity);
// Get recommended users
router.get('/recommendations', auth, profileController.getRecommendedUsers);
// Update availability
router.put('/availability', auth, profileController.updateAvailability);
// Add achievement
router.post('/achievements', auth, profileController.addAchievement);
// Get current user's profile
router.get('/', auth, profileController.getProfile);
// Update current user's profile
router.put('/', auth, profileController.updateProfile);
// Get profile by user ID
router.get('/:userId', profileController.getProfileById);

module.exports = router;
