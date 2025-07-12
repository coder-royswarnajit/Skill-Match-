import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  Code, 
  TrendingUp, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Award,
  MessageSquare,
  Calendar,
  ArrowRight,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { getProfile, getRecommendedUsers } from '../services/profile';
import { getTrendingSkills } from '../services/skills';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, recommendedRes, trendingRes] = await Promise.all([
          getProfile(),
          getRecommendedUsers(),
          getTrendingSkills()
        ]);

        if (profileRes.success) {
          setProfile(profileRes.data);
        }

        if (recommendedRes.success) {
          setRecommendedUsers(recommendedRes.data);
        }

        if (trendingRes.success) {
          setTrendingSkills(trendingRes.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: 'Skills Offered',
      value: profile?.skillsOffered?.length || 0,
      icon: <Code className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Skills Wanted',
      value: profile?.skillsWanted?.length || 0,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Completed Swaps',
      value: profile?.completedSwaps || 0,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Rating',
      value: profile?.rating?.average?.toFixed(1) || '0.0',
      icon: <Star className="w-6 h-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const recentActivity = [
    {
      type: 'swap_request',
      title: 'Swap Request Received',
      description: 'Rahul wants to learn React from you',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'swap_completed',
      title: 'Swap Completed',
      description: 'Successfully taught Python to Priya',
      time: '1 day ago',
      status: 'completed'
    },
    {
      type: 'rating_received',
      title: 'New Rating',
      description: 'Received 5 stars for JavaScript teaching',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      from: 'Rahul Kumar',
      university: 'IIT Bombay',
      skill: 'React',
      message: 'Hi! I would love to learn React from you. I can teach you Python in return.',
      time: '2 hours ago'
    },
    {
      id: 2,
      from: 'Priya Sharma',
      university: 'NIT Trichy',
      skill: 'Machine Learning',
      message: 'I\'m interested in learning ML. I can help you with web development.',
      time: '1 day ago'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-orange-100 to-black/90 relative overflow-hidden py-8"
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.2, duration: 1.2, type: 'spring' }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-yellow-400 via-orange-400 to-black z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-black via-orange-400 to-yellow-400 z-0"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Welcome Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-black via-orange-900 to-yellow-400 rounded-2xl shadow-xl p-8 mb-8 border border-orange-200"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
                Welcome back, {user?.firstName}! <span className="text-orange-300">👋</span>
              </h1>
              <p className="text-orange-100 mt-2 text-lg">
                Ready to learn and teach today? Here's what's happening on your SkillSwap dashboard.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center px-5 py-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-black text-white rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-black transition-all"
              >
                <User className="w-5 h-5 mr-2" />
                Edit Profile
              </Link>
              <Link
                to="/browse"
                className="flex items-center px-5 py-2 border border-orange-300 text-orange-900 bg-white/80 rounded-lg font-semibold shadow hover:bg-orange-50 transition-all"
              >
                <Users className="w-5 h-5 mr-2" />
                Find Students
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04, rotate: 1 }}
              className={`rounded-2xl shadow-xl p-6 flex items-center bg-gradient-to-br from-white via-orange-100 to-yellow-100 border-2 border-orange-200`}
            >
              <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color} shadow`}>{stat.icon}</div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-orange-700">{stat.title}</p>
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Pending Requests */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-orange-100 via-yellow-100 to-white rounded-2xl shadow-lg"
            >
              <div className="p-6 border-b border-orange-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-orange-900">Pending Swap Requests</h2>
                  <Link
                    to="/swap-requests"
                    className="text-orange-600 hover:text-orange-700 text-sm font-semibold"
                  >
                    View All
                  </Link>
                </div>
              </div>
              
              {pendingRequests.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No pending requests</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="font-medium text-gray-900">{request.from}</h3>
                            <span className="ml-2 text-sm text-gray-500">• {request.university}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Wants to learn: <span className="font-medium">{request.skill}</span>
                          </p>
                          <p className="text-sm text-gray-600 mb-3">{request.message}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {request.time}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200 transition-colors">
                            Accept
                          </button>
                          <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200 transition-colors">
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-purple-100 via-orange-100 to-white rounded-2xl shadow-lg"
            >
              <div className="p-6 border-b border-purple-200">
                <h2 className="text-lg font-bold text-purple-900">Recent Activity</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100' : 
                        activity.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {activity.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : activity.status === 'pending' ? (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
            className="space-y-6"
          >
            {/* Recommended Users */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-blue-100 via-orange-100 to-white rounded-2xl shadow-lg"
            >
              <div className="p-6 border-b border-blue-200">
                <h2 className="text-lg font-bold text-blue-900">Recommended for You</h2>
              </div>
              
              <div className="p-6">
                {recommendedUsers.length === 0 ? (
                  <p className="text-gray-600 text-sm">No recommendations yet</p>
                ) : (
                  <div className="space-y-4">
                    {recommendedUsers.slice(0, 3).map((user, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {user.userId?.firstName?.charAt(0)}{user.userId?.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.userId?.firstName} {user.userId?.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.userId?.university}
                          </p>
                        </div>
                        <Link
                          to={`/profile/${user.userId?._id}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                
                <Link
                  to="/browse"
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View More
                </Link>
              </div>
            </motion.div>

            {/* Trending Skills */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-green-100 via-orange-100 to-white rounded-2xl shadow-lg"
            >
              <div className="p-6 border-b border-green-200">
                <h2 className="text-lg font-bold text-green-900">Trending Skills</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {trendingSkills.slice(0, 5).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.count} students</span>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to My Skills
                </button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7, type: 'spring' }}
              className="bg-gradient-to-tr from-red-100 via-orange-100 to-white rounded-2xl shadow-lg"
            >
              <div className="p-6 border-b border-red-200">
                <h2 className="text-lg font-bold text-red-900">Quick Actions</h2>
              </div>
              
              <div className="p-6 space-y-3">
                <Link
                  to="/discussions"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Join Discussions</span>
                </Link>
                
                <Link
                  to="/profile"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Update Profile</span>
                </Link>
                
                <Link
                  to="/browse"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Users className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Find Students</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard; 