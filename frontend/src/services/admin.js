import api from './api';

// Admin Dashboard
export const getAdminDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// User Management
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const toggleUserBan = async (userId, reason = '') => {
  try {
    const response = await api.put(`/admin/users/${userId}/ban`, { reason });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Skill Moderation
export const getPendingSkills = async (params = {}) => {
  try {
    const response = await api.get('/admin/skills/pending', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const approveSkill = async (skillId, profileId) => {
  try {
    const response = await api.put(`/admin/skills/${skillId}/approve`, { profileId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const rejectSkill = async (skillId, profileId, reason) => {
  try {
    const response = await api.put(`/admin/skills/${skillId}/reject`, { profileId, reason });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Swap Management
export const getSwaps = async (params = {}) => {
  try {
    const response = await api.get('/admin/swaps', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Platform Notifications
export const sendPlatformNotification = async (notificationData) => {
  try {
    const response = await api.post('/admin/notifications', notificationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reports
export const generateReport = async (params = {}) => {
  try {
    const response = await api.get('/admin/reports', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Download report as CSV
export const downloadReport = async (type, startDate, endDate) => {
  try {
    const response = await api.get('/admin/reports', {
      params: { type, startDate, endDate },
      responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${type}-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 