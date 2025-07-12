import api from './api'

export const authService = {
  // Register new user
  register: (userData) => {
    return api.post('/auth/register', userData)
  },

  // Login user
  login: (credentials) => {
    return api.post('/auth/login', credentials)
  },

  // Get current user
  getMe: () => {
    return api.get('/auth/me')
  },

  // Refresh token
  refreshToken: () => {
    return api.post('/auth/refresh')
  }
} 