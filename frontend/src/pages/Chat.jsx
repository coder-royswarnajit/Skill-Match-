import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Send, 
  Clock, 
  AlertTriangle, 
  Flag, 
  Play, 
  Square, 
  BookOpen,
  Shield,
  CheckCircle,
  XCircle,
  FileText,
  Image,
  Paperclip
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const Chat = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [studyTopic, setStudyTopic] = useState('');

  // Mock data for demonstration
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: { id: 'user1', firstName: 'Rahul', lastName: 'Kumar' },
      content: 'Hi! Ready to start our React and Python swap?',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      messageType: 'text'
    },
    {
      id: 2,
      sender: { id: 'user2', firstName: 'Priya', lastName: 'Sharma' },
      content: 'Absolutely! I\'m excited to learn React from you. I can help you with Python data science.',
      timestamp: new Date(Date.now() - 3500000),
      isRead: true,
      messageType: 'text'
    },
    {
      id: 3,
      sender: 'system',
      content: 'Study session guidelines have been agreed to by both participants.',
      timestamp: new Date(Date.now() - 3400000),
      messageType: 'system'
    }
  ]);

  useEffect(() => {
    loadChat();
    scrollToBottom();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChat = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      setTimeout(() => {
        setChat({
          id: chatId,
          swapId: 'swap123',
          participants: [
            { id: 'user1', firstName: 'Rahul', lastName: 'Kumar', university: 'IIT Bombay' },
            { id: 'user2', firstName: 'Priya', lastName: 'Sharma', university: 'NIT Trichy' }
          ],
          swap: {
            requestedSkill: { name: 'React' },
            offeredSkill: { name: 'Python' },
            status: 'accepted'
          },
          guidelines: {
            agreedToGuidelines: false
          },
          isActive: true
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading chat:', error);
      toast.error('Failed to load chat');
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    try {
      const newMessage = {
        id: Date.now(),
        sender: { id: user.id, firstName: user.firstName, lastName: user.lastName },
        content: message.trim(),
        timestamp: new Date(),
        isRead: false,
        messageType: 'text'
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Mock API call
      setTimeout(() => {
        // Simulate message being read
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, isRead: true } : msg
          )
        );
      }, 2000);

      toast.success('Message sent');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const flagMessage = (messageId, reason) => {
    toast.success('Message flagged for moderation');
  };

  const startStudySession = async () => {
    if (!studyTopic.trim()) {
      toast.error('Please enter a study topic');
      return;
    }

    try {
      const session = {
        id: Date.now(),
        topic: studyTopic,
        startTime: new Date(),
        initiatedBy: user.id
      };

      setActiveSession(session);
      setStudyTopic('');

      // Add system message
      const systemMessage = {
        id: Date.now() + 1,
        sender: 'system',
        content: `Study session started: ${session.topic}`,
        timestamp: new Date(),
        messageType: 'system'
      };

      setMessages(prev => [...prev, systemMessage]);
      toast.success('Study session started');
    } catch (error) {
      console.error('Error starting study session:', error);
      toast.error('Failed to start study session');
    }
  };

  const endStudySession = async () => {
    if (!activeSession) return;

    try {
      const duration = Math.round((new Date() - activeSession.startTime) / (1000 * 60));
      
      // Add system message
      const systemMessage = {
        id: Date.now(),
        sender: 'system',
        content: `Study session ended. Duration: ${duration} minutes.`,
        timestamp: new Date(),
        messageType: 'system'
      };

      setMessages(prev => [...prev, systemMessage]);
      setActiveSession(null);
      toast.success('Study session ended');
    } catch (error) {
      console.error('Error ending study session:', error);
      toast.error('Failed to end study session');
    }
  };

  const agreeToGuidelines = async () => {
    try {
      setAgreedToGuidelines(true);
      setShowGuidelines(false);
      
      // Add system message
      const systemMessage = {
        id: Date.now(),
        sender: 'system',
        content: 'Study session guidelines have been agreed to by both participants.',
        timestamp: new Date(),
        messageType: 'system'
      };

      setMessages(prev => [...prev, systemMessage]);
      toast.success('Guidelines agreed to');
    } catch (error) {
      console.error('Error agreeing to guidelines:', error);
      toast.error('Failed to agree to guidelines');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      toast.success('File uploaded successfully');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat Not Found</h2>
          <p className="text-gray-600 mb-4">The chat you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-pink-100 to-white relative overflow-hidden py-8"
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.2, duration: 1.2, type: 'spring' }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-400 via-pink-400 to-white z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-pink-200 via-blue-200 to-white z-0"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-blue-100 via-pink-100 to-white rounded-2xl shadow-xl p-6 mb-6 border border-pink-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-blue-900 drop-shadow-lg">Skill Swap Chat</h2>
              <p className="text-pink-700 font-semibold">Connect, collaborate, and learn together!</p>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-pink-400" />
              <span className="text-pink-700 font-bold">Guidelines</span>
            </div>
          </div>
        </motion.div>
        {/* Chat Area */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-white via-blue-50 to-pink-50 rounded-2xl shadow-lg p-6 mb-6 h-[400px] overflow-y-auto flex flex-col"
        >
          {/* Study Session Controls */}
          {agreedToGuidelines && (
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Study Session</span>
                </div>
                {!activeSession ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Enter study topic..."
                      value={studyTopic}
                      onChange={(e) => setStudyTopic(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={startStudySession}
                      className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Active: {activeSession.topic}
                    </span>
                    <button
                      onClick={endStudySession}
                      className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      <Square className="w-4 h-4 mr-1" />
                      End
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: msg.id * 0.05 }}
                className={`flex ${msg.sender === 'system' ? 'justify-center' : msg.sender.id === user.id ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'system' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: msg.id * 0.05 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">{msg.content}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: msg.id * 0.05 }}
                    className={`max-w-xs lg:max-w-md ${msg.sender.id === user.id ? 'order-2' : 'order-1'}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: msg.id * 0.05 }}
                      className={`rounded-lg px-3 py-2 ${
                        msg.sender.id === user.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">
                          {msg.sender.firstName} {msg.sender.lastName}
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs opacity-75">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {msg.sender.id !== user.id && (
                            <button
                              onClick={() => flagMessage(msg.id, 'inappropriate')}
                              className="opacity-50 hover:opacity-100 transition-opacity"
                            >
                              <Flag className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                      {msg.sender.id === user.id && (
                        <div className="flex justify-end mt-1">
                          {msg.isRead ? (
                            <CheckCircle className="w-3 h-3 text-blue-300" />
                          ) : (
                            <Clock className="w-3 h-3 text-blue-300" />
                          )}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {agreedToGuidelines && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
              className="border-t border-gray-200 p-4"
            >
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="2"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim() || sending}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Guidelines Modal */}
      {showGuidelines && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Study Chat Guidelines</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p><strong>Rules:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Be respectful and professional at all times</li>
                <li>Focus on educational content and skill sharing</li>
                <li>No harassment, bullying, or inappropriate behavior</li>
                <li>No spam or promotional content</li>
                <li>Report violations immediately</li>
              </ul>
              <p className="mt-3"><strong>Consequences:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>First violation: Warning</li>
                <li>Second violation: Temporary chat suspension</li>
                <li>Third violation: Permanent chat ban</li>
                <li>Severe violations: Immediate account suspension</li>
              </ul>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowGuidelines(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={agreeToGuidelines}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                I Agree
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Chat; 