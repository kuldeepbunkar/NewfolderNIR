import axios from 'axios';
import { handleApiError } from './errorHandler';

const BASE_URL = process.env.REACT_APP_API_URL;

export const adminApi = {
  // Dashboard
  getDashboardStats: () => 
    axios.get(`${BASE_URL}/admin/stats`).catch(handleApiError),

  // Users
  getUsers: (params) => 
    axios.get(`${BASE_URL}/admin/users`, { params }).catch(handleApiError),
  updateUser: (userId, data) => 
    axios.put(`${BASE_URL}/admin/users/${userId}`, data).catch(handleApiError),
  deleteUser: (userId) => 
    axios.delete(`${BASE_URL}/admin/users/${userId}`).catch(handleApiError),

  // Properties
  getProperties: (params) => 
    axios.get(`${BASE_URL}/admin/properties`, { params }).catch(handleApiError),
  approveProperty: (propertyId) => 
    axios.put(`${BASE_URL}/admin/properties/${propertyId}/approve`).catch(handleApiError),
  rejectProperty: (propertyId) => 
    axios.put(`${BASE_URL}/admin/properties/${propertyId}/reject`).catch(handleApiError),

  // System
  getSystemHealth: () => 
    axios.get(`${BASE_URL}/admin/system/health`).catch(handleApiError),
  getSystemLogs: (params) => 
    axios.get(`${BASE_URL}/admin/system/logs`, { params }).catch(handleApiError),
  
  // Settings
  getSettings: () => 
    axios.get(`${BASE_URL}/admin/settings`).catch(handleApiError),
  updateSettings: (data) => 
    axios.put(`${BASE_URL}/admin/settings`, data).catch(handleApiError)
}; 