const express = require('express');
const { auth } = require('../middleware/auth');
const { validate, authSchemas } = require('../middleware/validation');
const {
  register,
  login,
  getMe,
  refreshToken
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', validate(authSchemas.register), register);
router.post('/login', validate(authSchemas.login), login);

// Protected routes
router.get('/me', auth, getMe);
router.post('/refresh', auth, refreshToken);

module.exports = router; 