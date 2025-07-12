import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { discussionService } from '../services/discussions'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  Eye,
  Heart,
  Clock,
  Tag
} from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const Discussions = () => {
  const { user } = useAuth()
  const [discussions, setDiscussions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'classes', label: 'Classes' },
    { value: 'career', label: 'Career' },
    { value: 'projects', label: 'Projects' },
    { value: 'internships', label: 'Internships' },
    { value: 'research', label: 'Research' },
    { value: 'events', label: 'Events' },
    { value: 'tools', label: 'Tools' },
    { value: 'other', label: 'Other' }
  ]

  const sortOptions = [
    { value: 'latest', label: 'Latest', icon: Clock },
    { value: 'popular', label: 'Most Popular', icon: TrendingUp },
    { value: 'views', label: 'Most Viewed', icon: Eye }
  ]

  useEffect(() => {
    loadDiscussions()
  }, [currentPage, category, sortBy, searchTerm])

  const loadDiscussions = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 10,
        category: category !== 'all' ? category : undefined,
        search: searchTerm || undefined,
        sort: sortBy
      }

      const response = await discussionService.getDiscussions(params)
      setDiscussions(response.data.data.discussions)
      setTotalPages(response.data.data.pagination.totalPages)
    } catch (error) {
      toast.error('Failed to load discussions')
      console.error('Load discussions error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    loadDiscussions()
  }

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    setCurrentPage(1)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
    setCurrentPage(1)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getCategoryColor = (cat) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      classes: 'bg-blue-100 text-blue-800',
      career: 'bg-green-100 text-green-800',
      projects: 'bg-purple-100 text-purple-800',
      internships: 'bg-yellow-100 text-yellow-800',
      research: 'bg-red-100 text-red-800',
      events: 'bg-pink-100 text-pink-800',
      tools: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[cat] || colors.other
  }

  if (loading && discussions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-100 to-white relative overflow-hidden py-8"
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.2, duration: 1.2, type: 'spring' }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-white z-0"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.10 }}
        transition={{ delay: 0.4, duration: 1.2, type: 'spring' }}
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-200 via-pink-200 to-white z-0"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-pink-900 mb-2 drop-shadow-lg">CS Discussions</h1>
            <p className="text-purple-700 text-lg">
              Connect with fellow CS students, share knowledge, and discuss topics
            </p>
          </div>
          {user && (
            <Link
              to="/discussions/new"
              className="btn btn-primary flex items-center mt-4 sm:mt-0 bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-400 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-yellow-500 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Discussion
            </Link>
          )}
        </motion.div>
        {/* Filters and Search */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
          className="bg-gradient-to-tr from-pink-100 via-purple-100 to-white rounded-2xl shadow-xl border border-pink-200 p-8 mb-8"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10 text-lg border-pink-200 focus:ring-pink-400"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-400 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-yellow-500 transition-all">
                Search
              </button>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-pink-500" />
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="input min-w-[150px] border-pink-200 focus:ring-pink-400"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-md text-purple-700 font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="input min-w-[150px] border-pink-200 focus:ring-pink-400"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </motion.div>
        {/* Discussions List */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
          className="space-y-4"
        >
          {discussions.map((discussion) => (
            <motion.div
              key={discussion._id}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 rgba(236, 72, 153, 0.15)' }}
              className="bg-gradient-to-tr from-white via-pink-50 to-purple-50 rounded-2xl shadow-lg border border-pink-200 p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`badge ${getCategoryColor(discussion.category)}`}>
                      {discussion.category}
                    </span>
                    {discussion.isPinned && (
                      <span className="badge badge-warning">Pinned</span>
                    )}
                  </div>
                  <Link 
                    to={`/discussions/${discussion._id}`}
                    className="block"
                  >
                    <h3 className="text-xl font-semibold text-pink-900 hover:text-purple-600 transition-colors mb-2">
                      {discussion.title}
                    </h3>
                  </Link>
                  <p className="text-purple-700 mb-4 line-clamp-2">
                    {discussion.content.substring(0, 200)}
                    {discussion.content.length > 200 && '...'}
                  </p>
                  {/* Tags */}
                  {discussion.tags && discussion.tags.length > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="w-4 h-4 text-pink-400" />
                      <div className="flex flex-wrap gap-1">
                        {discussion.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                        {discussion.tags.length > 3 && (
                          <span className="text-xs text-purple-500">
                            +{discussion.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <img
                          src={`https://ui-avatars.com/api/?name=${discussion.author.firstName}+${discussion.author.lastName}&background=random`}
                          alt={`${discussion.author.firstName} ${discussion.author.lastName}`}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>
                          {discussion.author.firstName} {discussion.author.lastName}
                        </span>
                      </div>
                      <span>•</span>
                      <span>{discussion.author.major}</span>
                      <span>•</span>
                      <span>{formatDate(discussion.createdAt)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{discussion.likeCount || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.commentCount || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{discussion.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
            className="flex justify-center mt-8"
          >
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && discussions.length === 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || category !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Be the first to start a discussion!'
              }
            </p>
            {user && (
              <Link to="/discussions/new" className="btn btn-primary">
                Start a Discussion
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Discussions 