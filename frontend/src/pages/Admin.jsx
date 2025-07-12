import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  UserCheck,
  TrendingUp,
  MessageSquare,
  Code,
  MapPin,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSwaps: 0,
    pendingSwaps: 0,
    totalSkills: 0,
    discussions: 0
  });

  // Mock data for demonstration
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      university: 'IIT Bombay',
      status: 'active',
      joinDate: '2024-01-15',
      swaps: 5,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      university: 'NIT Trichy',
      status: 'active',
      joinDate: '2024-01-20',
      swaps: 3,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      university: 'BITS Pilani',
      status: 'banned',
      joinDate: '2024-01-10',
      swaps: 0,
      rating: 0
    }
  ]);

  const [pendingSkills, setPendingSkills] = useState([
    {
      id: 1,
      skill: 'Advanced Machine Learning',
      user: 'Rahul Kumar',
      description: 'Deep learning with TensorFlow and PyTorch',
      submittedDate: '2024-01-25'
    },
    {
      id: 2,
      skill: 'Blockchain Development',
      user: 'Priya Sharma',
      description: 'Smart contracts and DApp development',
      submittedDate: '2024-01-24'
    }
  ]);

  useEffect(() => {
    // Load admin dashboard data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      setTimeout(() => {
        setStats({
          totalUsers: 156,
          activeUsers: 142,
          totalSwaps: 89,
          pendingSwaps: 12,
          totalSkills: 234,
          discussions: 67
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleBanUser = (userId) => {
    // Mock ban user functionality
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
        : user
    ));
    toast.success('User status updated successfully');
  };

  const handleApproveSkill = (skillId) => {
    setPendingSkills(pendingSkills.filter(skill => skill.id !== skillId));
    toast.success('Skill approved successfully');
  };

  const handleRejectSkill = (skillId) => {
    setPendingSkills(pendingSkills.filter(skill => skill.id !== skillId));
    toast.success('Skill rejected');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'skills', label: 'Skill Moderation', icon: Shield },
    { id: 'swaps', label: 'Swap Management', icon: Code },
    { id: 'chat-moderation', label: 'Chat Moderation', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: TrendingUp }
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
      className="min-h-screen flex flex-col bg-gradient-to-br from-black via-orange-100 to-yellow-100 relative overflow-hidden py-8"
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.2, duration: 1.2, type: 'spring' }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-black via-orange-400 to-yellow-400 z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-yellow-200 via-orange-200 to-black z-0"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-black via-orange-900 to-yellow-400 rounded-2xl shadow-xl p-8 mb-8 border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Admin Dashboard</h1>
              <p className="text-orange-100 mt-2 text-lg">Manage your SkillSwap platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-md text-orange-200 font-semibold">
                <Shield className="w-6 h-6" />
                <span>Admin Access</span>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Tabs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-black via-orange-100 to-yellow-100 rounded-2xl shadow-xl mb-8"
        >
          <div className="border-b border-orange-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-bold text-md flex items-center space-x-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-700 bg-orange-50 rounded-t-lg shadow'
                        : 'border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>
        {/* Tab Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-white via-orange-50 to-yellow-50 rounded-2xl shadow-xl p-8"
        >
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Users</p>
                      <p className="text-3xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Users</p>
                      <p className="text-3xl font-bold">{stats.activeUsers}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Swaps</p>
                      <p className="text-3xl font-bold">{stats.totalSwaps}</p>
                    </div>
                    <Code className="w-8 h-8 text-purple-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Pending Swaps</p>
                      <p className="text-3xl font-bold">{stats.pendingSwaps}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100">Total Skills</p>
                      <p className="text-3xl font-bold">{stats.totalSkills}</p>
                    </div>
                    <Shield className="w-8 h-8 text-indigo-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-100">Discussions</p>
                      <p className="text-3xl font-bold">{stats.discussions}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-pink-200" />
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">New user registration: Priya Sharma</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Skill swap completed: React ↔ Python</span>
                    <span className="text-xs text-gray-400">4 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">New skill pending approval: Blockchain Development</span>
                    <span className="text-xs text-gray-400">6 hours ago</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Banned</option>
                </select>
              </div>

              {/* Users Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="overflow-x-auto"
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Swaps</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.university}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.swaps}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.rating}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleBanUser(user.id)}
                              className={`${user.status === 'banned' ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'}`}
                            >
                              {user.status === 'banned' ? <UserCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-semibold text-gray-900"
              >
                Pending Skill Approvals
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {pendingSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: skill.id * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{skill.skill}</h4>
                        <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Submitted by: {skill.user}</span>
                          <span>Date: {skill.submittedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApproveSkill(skill.id)}
                          className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectSkill(skill.id)}
                          className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {pendingSkills.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No pending skills to approve</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}

          {activeTab === 'swaps' && (
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-semibold text-gray-900"
              >
                Swap Management
              </motion.h3>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="End Date"
                />
              </div>

              {/* Swaps Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="overflow-x-auto"
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Swap Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">React ↔ Python</div>
                          <div className="text-sm text-gray-500">Web development for data science</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Rahul Kumar ↔ Priya Sharma</div>
                        <div className="text-sm text-gray-500">IIT Bombay ↔ NIT Trichy</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">2024-01-20</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Machine Learning ↔ Web Dev</div>
                          <div className="text-sm text-gray-500">ML algorithms for portfolio website</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Amit Patel ↔ Neha Singh</div>
                        <div className="text-sm text-gray-500">BITS Pilani ↔ IIT Delhi</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">2024-01-25</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            </div>
          )}

          {activeTab === 'chat-moderation' && (
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-semibold text-gray-900"
              >
                Chat Moderation
              </motion.h3>
              
              {/* Flagged Messages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-md font-medium text-gray-900 mb-4">Flagged Messages</h4>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-red-800">Rahul Kumar</span>
                          <span className="text-xs text-red-600">→</span>
                          <span className="text-sm font-medium text-red-800">Priya Sharma</span>
                        </div>
                        <p className="text-sm text-red-700 mb-2">"This is inappropriate content that violates guidelines"</p>
                        <div className="flex items-center space-x-4 text-xs text-red-600">
                          <span>Flagged by: Priya Sharma</span>
                          <span>Reason: Inappropriate</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                          Ban User
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-yellow-800">Amit Patel</span>
                          <span className="text-xs text-yellow-600">→</span>
                          <span className="text-sm font-medium text-yellow-800">Neha Singh</span>
                        </div>
                        <p className="text-sm text-yellow-700 mb-2">"Spam message promoting external services"</p>
                        <div className="flex items-center space-x-4 text-xs text-yellow-600">
                          <span>Flagged by: Neha Singh</span>
                          <span>Reason: Spam</span>
                          <span>1 day ago</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                          Ban User
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Chat Guidelines */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <h4 className="text-md font-medium text-blue-900 mb-3">Chat Guidelines</h4>
                <div className="text-sm text-blue-800 space-y-2">
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
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-md font-medium text-gray-900 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                    <div className="text-red-800 font-medium">Ban User</div>
                    <div className="text-sm text-red-600">Immediately ban user from platform</div>
                  </button>
                  <button className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
                    <div className="text-yellow-800 font-medium">Suspend Chat</div>
                    <div className="text-sm text-yellow-600">Temporarily suspend chat activity</div>
                  </button>
                  <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="text-green-800 font-medium">Send Warning</div>
                    <div className="text-sm text-green-600">Send warning message to user</div>
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-semibold text-gray-900"
              >
                Platform Notifications
              </motion.h3>
              
              {/* Send Notification Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h4 className="text-md font-medium text-gray-900 mb-4">Send Platform-Wide Message</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter notification title..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows="4"
                      placeholder="Enter notification message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="info">Information</option>
                      <option value="warning">Warning</option>
                      <option value="success">Success</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Notification
                  </button>
                </form>
              </motion.div>

              {/* Recent Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-md font-medium text-gray-900 mb-4">Recent Notifications</h4>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">New Feature: Skill Verification</h5>
                        <p className="text-sm text-gray-600">We've added a new skill verification system to ensure quality.</p>
                        <p className="text-xs text-gray-400 mt-1">Sent 2 hours ago</p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Info
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Scheduled Maintenance</h5>
                        <p className="text-sm text-gray-600">Platform will be down for maintenance on Sunday 2-4 AM IST.</p>
                        <p className="text-xs text-gray-400 mt-1">Sent 1 day ago</p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Warning
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-900">Platform Reports</h3>
                <div className="flex space-x-2">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="user-activity">User Activity</option>
                    <option value="swap-stats">Swap Statistics</option>
                    <option value="platform-overview">Platform Overview</option>
                  </select>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Download CSV
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h4 className="text-md font-medium text-gray-900 mb-4">User Growth</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="text-sm font-medium">+23 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="text-sm font-medium">+18 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Growth</span>
                      <span className="text-sm font-medium text-green-600">+156%</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h4 className="text-md font-medium text-gray-900 mb-4">Skill Swap Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed Swaps</span>
                      <span className="text-sm font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending Swaps</span>
                      <span className="text-sm font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="text-sm font-medium text-green-600">88%</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h4 className="text-md font-medium text-gray-900 mb-4">Top Universities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IIT Bombay</span>
                      <span className="text-sm font-medium">45 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">NIT Trichy</span>
                      <span className="text-sm font-medium">32 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">BITS Pilani</span>
                      <span className="text-sm font-medium">28 users</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h4 className="text-md font-medium text-gray-900 mb-4">Popular Skills</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">React</span>
                      <span className="text-sm font-medium">67 offers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Python</span>
                      <span className="text-sm font-medium">54 offers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Machine Learning</span>
                      <span className="text-sm font-medium">43 offers</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Admin; 