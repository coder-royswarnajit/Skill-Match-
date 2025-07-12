const express = require('express');
const router = express.Router();
const {
  getSkillCategories,
  getPopularSkills,
  getIndianUniversities,
  searchSkills,
  getTrendingSkills
} = require('../controllers/skillsController');

// Get all skill categories
router.get('/categories', getSkillCategories);

// Get popular skills for Indian CS students
router.get('/popular', getPopularSkills);

// Get Indian universities and related data
router.get('/universities', getIndianUniversities);

// Search skills
router.get('/search', searchSkills);

// Get trending skills
router.get('/trending', getTrendingSkills);

module.exports = router; 