import api from './api'

export const discussionService = {
  // Get all discussions
  getDiscussions: (params = {}) => {
    return api.get('/discussions', { params })
  },

  // Get single discussion
  getDiscussion: (id) => {
    return api.get(`/discussions/${id}`)
  },

  // Create discussion
  createDiscussion: (discussionData) => {
    return api.post('/discussions', discussionData)
  },

  // Update discussion
  updateDiscussion: (id, updateData) => {
    return api.put(`/discussions/${id}`, updateData)
  },

  // Delete discussion
  deleteDiscussion: (id) => {
    return api.delete(`/discussions/${id}`)
  },

  // Like/unlike discussion
  toggleLike: (id) => {
    return api.post(`/discussions/${id}/like`)
  },

  // Add comment
  addComment: (discussionId, commentData) => {
    return api.post(`/discussions/${discussionId}/comments`, commentData)
  }
} 