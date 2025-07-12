const Chat = require('../models/Chat');
const Swap = require('../models/Swap');
const User = require('../models/User');
const logger = require('../utils/logger');

// Get user's chats
const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.findByParticipant(req.user.id);
    
    res.json({
      success: true,
      data: chats
    });
  } catch (error) {
    logger.error('Error fetching user chats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chats',
      error: error.message
    });
  }
};

// Get specific chat
const getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    
    const chat = await Chat.findById(chatId)
      .populate('participants', 'firstName lastName email university')
      .populate('swapId', 'requestedSkill offeredSkill status')
      .populate('messages.sender', 'firstName lastName')
      .populate('studySessions.initiatedBy', 'firstName lastName');

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant
    if (!chat.participants.some(p => p._id.toString() === req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: chat
    });
  } catch (error) {
    logger.error('Error fetching chat:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat',
      error: error.message
    });
  }
};

// Send message
const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content, messageType = 'text', fileUrl, fileName } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant
    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if chat is active
    if (!chat.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Chat is not active'
      });
    }

    // Check for inappropriate content (basic filter)
    const inappropriateWords = ['spam', 'inappropriate', 'harassment'];
    const hasInappropriateContent = inappropriateWords.some(word => 
      content.toLowerCase().includes(word)
    );

    if (hasInappropriateContent) {
      // Flag the message automatically
      await chat.addMessage(req.user.id, content, messageType, fileUrl, fileName);
      const lastMessage = chat.messages[chat.messages.length - 1];
      await chat.flagMessage(lastMessage._id, req.user.id, 'inappropriate');
      
      return res.status(400).json({
        success: false,
        message: 'Message contains inappropriate content and has been flagged'
      });
    }

    await chat.addMessage(req.user.id, content, messageType, fileUrl, fileName);

    // Populate the new message
    const populatedChat = await Chat.findById(chatId)
      .populate('messages.sender', 'firstName lastName email')
      .populate('participants', 'firstName lastName email');

    const newMessage = populatedChat.messages[populatedChat.messages.length - 1];

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    logger.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// Mark message as read
const markMessageAsRead = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await chat.markMessageAsRead(messageId, req.user.id);

    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    logger.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking message as read',
      error: error.message
    });
  }
};

// Flag message for moderation
const flagMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Flag reason is required'
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await chat.flagMessage(messageId, req.user.id, reason);

    res.json({
      success: true,
      message: 'Message flagged for moderation'
    });
  } catch (error) {
    logger.error('Error flagging message:', error);
    res.status(500).json({
      success: false,
      message: 'Error flagging message',
      error: error.message
    });
  }
};

// Start study session
const startStudySession = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: 'Study topic is required'
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if there's already an active session
    const activeSession = chat.studySessions.find(session => !session.endTime);
    if (activeSession) {
      return res.status(400).json({
        success: false,
        message: 'There is already an active study session'
      });
    }

    await chat.startStudySession(req.user.id, topic);

    // Add system message
    await chat.addMessage(
      'system',
      `Study session started: ${topic}`,
      'system'
    );

    res.json({
      success: true,
      message: 'Study session started',
      data: chat.studySessions[chat.studySessions.length - 1]
    });
  } catch (error) {
    logger.error('Error starting study session:', error);
    res.status(500).json({
      success: false,
      message: 'Error starting study session',
      error: error.message
    });
  }
};

// End study session
const endStudySession = async (req, res) => {
  try {
    const { chatId, sessionId } = req.params;
    const { notes } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const session = chat.studySessions.id(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Study session not found'
      });
    }

    if (session.endTime) {
      return res.status(400).json({
        success: false,
        message: 'Study session already ended'
      });
    }

    await chat.endStudySession(sessionId, notes);

    // Add system message
    await chat.addMessage(
      'system',
      `Study session ended. Duration: ${session.duration} minutes. Notes: ${notes || 'No notes'}`,
      'system'
    );

    res.json({
      success: true,
      message: 'Study session ended',
      data: session
    });
  } catch (error) {
    logger.error('Error ending study session:', error);
    res.status(500).json({
      success: false,
      message: 'Error ending study session',
      error: error.message
    });
  }
};

// Agree to guidelines
const agreeToGuidelines = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    chat.guidelines.agreedToGuidelines = true;
    chat.guidelines.agreedAt = new Date();
    await chat.save();

    res.json({
      success: true,
      message: 'Guidelines agreed to successfully'
    });
  } catch (error) {
    logger.error('Error agreeing to guidelines:', error);
    res.status(500).json({
      success: false,
      message: 'Error agreeing to guidelines',
      error: error.message
    });
  }
};

// Get chat guidelines
const getGuidelines = async (req, res) => {
  try {
    const guidelines = {
      title: 'SkillSwap Study Chat Guidelines',
      rules: [
        'Be respectful and professional at all times',
        'Focus on educational content and skill sharing',
        'No harassment, bullying, or inappropriate behavior',
        'No sharing of personal information beyond what\'s necessary',
        'No spam or promotional content',
        'Report any violations immediately',
        'Keep discussions relevant to the agreed skill swap',
        'Use appropriate language and avoid profanity',
        'Be punctual for scheduled study sessions',
        'Provide constructive feedback and support'
      ],
      consequences: [
        'First violation: Warning',
        'Second violation: Temporary chat suspension',
        'Third violation: Permanent chat ban',
        'Severe violations: Immediate account suspension'
      ]
    };

    res.json({
      success: true,
      data: guidelines
    });
  } catch (error) {
    logger.error('Error fetching guidelines:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching guidelines',
      error: error.message
    });
  }
};

// Admin: Get flagged messages
const getFlaggedMessages = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const chats = await Chat.find({
      'messages.isFlagged': true
    })
      .populate('messages.sender', 'firstName lastName email')
      .populate('messages.flaggedBy', 'firstName lastName email')
      .populate('participants', 'firstName lastName email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ 'messages.flaggedAt': -1 });

    const flaggedMessages = [];
    chats.forEach(chat => {
      chat.messages.forEach(message => {
        if (message.isFlagged) {
          flaggedMessages.push({
            chatId: chat._id,
            messageId: message._id,
            content: message.content,
            sender: message.sender,
            flaggedBy: message.flaggedBy,
            flagReason: message.flagReason,
            flaggedAt: message.flaggedAt,
            participants: chat.participants
          });
        }
      });
    });

    const total = await Chat.countDocuments({
      'messages.isFlagged': true
    });

    res.json({
      success: true,
      data: flaggedMessages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching flagged messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching flagged messages',
      error: error.message
    });
  }
};

// Admin: Ban user from chat
const banUserFromChat = async (req, res) => {
  try {
    const { chatId, userId } = req.params;
    const { reason } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Add warning
    await chat.addWarning(userId, reason, req.user.id);

    // Ban the user (remove from participants)
    chat.participants = chat.participants.filter(p => p.toString() !== userId);
    chat.isActive = false;

    // Add system message
    await chat.addMessage(
      'system',
      `User has been banned from this chat. Reason: ${reason}`,
      'system'
    );

    await chat.save();

    // Ban user from platform if severe violation
    if (reason.includes('severe') || reason.includes('harassment')) {
      const user = await User.findById(userId);
      if (user) {
        user.isBanned = true;
        user.banReason = `Chat violation: ${reason}`;
        user.bannedAt = new Date();
        user.bannedBy = req.user.id;
        await user.save();
      }
    }

    res.json({
      success: true,
      message: 'User banned from chat successfully'
    });
  } catch (error) {
    logger.error('Error banning user from chat:', error);
    res.status(500).json({
      success: false,
      message: 'Error banning user from chat',
      error: error.message
    });
  }
};

module.exports = {
  getUserChats,
  getChat,
  sendMessage,
  markMessageAsRead,
  flagMessage,
  startStudySession,
  endStudySession,
  agreeToGuidelines,
  getGuidelines,
  getFlaggedMessages,
  banUserFromChat
}; 