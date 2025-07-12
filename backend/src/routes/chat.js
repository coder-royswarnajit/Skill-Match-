const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const chatController = require('../controllers/chatController');

const router = express.Router();

// User routes (require authentication)
router.use(auth);

// Get user's chats
router.get('/', chatController.getUserChats);

// Get specific chat
router.get('/:chatId', chatController.getChat);

// Send message
router.post('/:chatId/messages', chatController.sendMessage);

// Mark message as read
router.put('/:chatId/messages/:messageId/read', chatController.markMessageAsRead);

// Flag message for moderation
router.post('/:chatId/messages/:messageId/flag', chatController.flagMessage);

// Study session management
router.post('/:chatId/sessions/start', chatController.startStudySession);
router.put('/:chatId/sessions/:sessionId/end', chatController.endStudySession);

// Guidelines
router.get('/guidelines', chatController.getGuidelines);
router.post('/:chatId/guidelines/agree', chatController.agreeToGuidelines);

// Admin routes (require admin authentication)
router.use('/admin', adminAuth);

// Get flagged messages
router.get('/admin/flagged-messages', chatController.getFlaggedMessages);

// Ban user from chat
router.post('/admin/:chatId/users/:userId/ban', chatController.banUserFromChat);

module.exports = router; 