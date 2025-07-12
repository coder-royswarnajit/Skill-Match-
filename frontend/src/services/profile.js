import api from './api';

// Get user profile
export const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/profile', profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get profile by user ID
export const getProfileById = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search profiles
export const searchProfiles = async (params) => {
  try {
    const response = await api.get('/profile/search', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get profiles by skill
export const getProfilesBySkill = async (skillName) => {
  try {
    const response = await api.get(`/profile/skill/${encodeURIComponent(skillName)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get profiles by location
export const getProfilesByLocation = async (location) => {
  try {
    const response = await api.get(`/profile/location/${encodeURIComponent(location)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get profiles by university
export const getProfilesByUniversity = async (university) => {
  try {
    const response = await api.get(`/profile/university/${encodeURIComponent(university)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload profile photo
export const uploadProfilePhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await api.post('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user's swap history
export const getSwapHistory = async () => {
  try {
    const response = await api.get('/profile/swaps');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user's achievements
export const getAchievements = async () => {
  try {
    const response = await api.get('/profile/achievements');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add achievement
export const addAchievement = async (achievementData) => {
  try {
    const response = await api.post('/profile/achievements', achievementData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update availability
export const updateAvailability = async (availabilityData) => {
  try {
    const response = await api.put('/profile/availability', availabilityData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get recommended users
export const getRecommendedUsers = async () => {
  try {
    const response = await api.get('/profile/recommendations');
    return response.data;
  } catch (error) {
    throw error;
  }
}; 