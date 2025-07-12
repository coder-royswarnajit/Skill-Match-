import api from './api'

export const swapService = {
  // Create new swap request
  createSwap: (swapData) => {
    return api.post('/swaps', swapData)
  },

  // Get all swaps for current user
  getSwaps: (params = {}) => {
    return api.get('/swaps', { params })
  },

  // Get specific swap
  getSwap: (swapId) => {
    return api.get(`/swaps/${swapId}`)
  },

  // Update swap status
  updateSwap: (swapId, updateData) => {
    return api.put(`/swaps/${swapId}`, updateData)
  },

  // Delete swap
  deleteSwap: (swapId) => {
    return api.delete(`/swaps/${swapId}`)
  },

  // Rate a swap
  rateSwap: (swapId, ratingData) => {
    return api.post(`/swaps/${swapId}/rate`, ratingData)
  }
} 