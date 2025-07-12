import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Code, 
  Star, 
  Users, 
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { searchProfiles } from '../services/profile';
import { getSkillCategories, getIndianUniversities } from '../services/skills';
import { getPopularSkills } from '../services/skills';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

const Browse = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skillCategories, setSkillCategories] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [popularSkills, setPopularSkills] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const [filters, setFilters] = useState({
    query: '',
    skill: '',
    location: '',
    university: '',
    category: '',
    level: ''
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, universitiesRes, skillsRes] = await Promise.all([
          getSkillCategories(),
          getIndianUniversities(),
          getPopularSkills()
        ]);

        setSkillCategories(categoriesRes.data || []);
        setUniversities(universitiesRes.data || {});
        setPopularSkills(skillsRes.data || []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    searchUsers();
  }, [filters, pagination.page]);

  const searchUsers = async () => {
    setLoading(true);
    try {
      const response = await searchProfiles({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });

      if (response.success) {
        setProfiles(response.data);
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }));
      }
    } catch (error) {
      console.error('Error searching profiles:', error);
      toast.error('Failed to search profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      skill: '',
      location: '',
      university: '',
      category: '',
      level: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillCategoryName = (categoryId) => {
    const category = skillCategories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-yellow-100 to-white relative overflow-hidden py-8"
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.2, duration: 1.2, type: 'spring' }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-green-400 via-yellow-400 to-white z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-yellow-200 via-green-200 to-white z-0"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold text-green-900 mb-4 drop-shadow-lg">
            Find CS Students
          </h1>
          <p className="text-yellow-900 text-lg">
            Discover talented computer science students from across India. Find someone to teach you a skill or learn from you.
          </p>
        </motion.div>
        {/* Search and Filters */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-green-100 via-yellow-100 to-white rounded-2xl shadow-xl p-8 mb-8"
        >
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skills, or keywords..."
                value={filters.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 bg-yellow-100 text-green-900 rounded-lg font-semibold shadow hover:bg-yellow-200 transition-all"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </button>
          </div>
          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="border-t pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React, Python, Machine Learning"
                    value={filters.skill}
                    onChange={(e) => handleFilterChange('skill', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <select
                    value={filters.university}
                    onChange={(e) => handleFilterChange('university', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                  >
                    <option value="">All Universities</option>
                    {universities.universities?.map((uni, index) => (
                      <option key={index} value={uni.name}>{uni.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                  >
                    <option value="">All Categories</option>
                    {skillCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level
                  </label>
                  <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-lg"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Popular Skills Quick Filters */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
          className="mb-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-3">Popular Skills</h3>
          <div className="flex flex-wrap gap-2">
            {popularSkills.slice(0, 10).map((skill, index) => (
              <button
                key={index}
                onClick={() => handleFilterChange('skill', skill)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {skill}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-green-100 via-yellow-100 to-white rounded-2xl shadow-xl p-8"
        >
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for profiles...</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <>
              <div className="p-6 border-b">
                <p className="text-gray-600">
                  Found {pagination.total} profiles
                  {filters.query && ` matching "${filters.query}"`}
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {profiles.map((profile) => (
                  <div key={profile._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-semibold">
                              {profile.userId?.firstName?.charAt(0)}{profile.userId?.lastName?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {profile.userId?.firstName} {profile.userId?.lastName}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <GraduationCap className="w-4 h-4 mr-1" />
                              {profile.userId?.university} • {profile.userId?.major}
                            </div>
                            {profile.location && (
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                {profile.location}
                              </div>
                            )}
                          </div>
                        </div>

                        {profile.bio && (
                          <p className="text-gray-600 mb-4 line-clamp-2">{profile.bio}</p>
                        )}

                        {/* Skills Offered */}
                        {profile.skillsOffered && profile.skillsOffered.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Can Teach:</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.skillsOffered.slice(0, 5).map((skill, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                    {skill.name}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs ${getSkillLevelColor(skill.level)}`}>
                                    {skill.level}
                                  </span>
                                </div>
                              ))}
                              {profile.skillsOffered.length > 5 && (
                                <span className="text-xs text-gray-500">
                                  +{profile.skillsOffered.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Skills Wanted */}
                        {profile.skillsWanted && profile.skillsWanted.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Wants to Learn:</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.skillsWanted.slice(0, 3).map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  {skill.name}
                                </span>
                              ))}
                              {profile.skillsWanted.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{profile.skillsWanted.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {profile.rating?.average?.toFixed(1) || '0.0'} ({profile.rating?.count || 0})
                          </div>
                          <div className="flex items-center">
                            <Code className="w-4 h-4 mr-1" />
                            {profile.completedSwaps || 0} swaps completed
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <Link
                          to={`/profile/${profile.userId?._id}`}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="p-6 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.pages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Browse; 