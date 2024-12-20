import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout'
  },
  properties: {
    list: '/properties',
    details: (id) => `/properties/${id}`,
    create: '/properties',
    update: (id) => `/properties/${id}`,
    delete: (id) => `/properties/${id}`
  },
  reviews: {
    list: (propertyId) => `/properties/${propertyId}/reviews`,
    create: (propertyId) => `/properties/${propertyId}/reviews`
  },
  tours: {
    schedule: '/tours/schedule'
  }
};

// API methods
export const apiMethods = {
  // Auth methods
  login: (data) => api.post(endpoints.auth.login, data),
  register: (data) => api.post(endpoints.auth.register, data),
  logout: () => api.post(endpoints.auth.logout),

  // Property methods
  getProperties: (params) => api.get(endpoints.properties.list, { params }),
  getPropertyDetails: (id) => api.get(endpoints.properties.details(id)),
  createProperty: (data) => api.post(endpoints.properties.create, data),
  updateProperty: (id, data) => api.put(endpoints.properties.update(id), data),
  deleteProperty: (id) => api.delete(endpoints.properties.delete(id)),

  // Review methods
  getPropertyReviews: (propertyId) => api.get(endpoints.reviews.list(propertyId)),
  createReview: (propertyId, data) => api.post(endpoints.reviews.create(propertyId), data),

  // Tour methods
  scheduleTour: (data) => api.post(endpoints.tours.schedule, data)
};

export default api; 