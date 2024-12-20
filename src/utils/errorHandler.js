import { API_CONFIG } from '../config/api.config';

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 400:
        return error.response.data.message || API_CONFIG.errorMessages.validation;
      case 401:
        return API_CONFIG.errorMessages.unauthorized;
      case 403:
        return API_CONFIG.errorMessages.forbidden;
      case 404:
        return API_CONFIG.errorMessages.notFound;
      default:
        return API_CONFIG.errorMessages.default;
    }
  } else if (error.request) {
    // Network error
    return API_CONFIG.errorMessages.network;
  }
  return API_CONFIG.errorMessages.default;
};

export const showErrorNotification = (message) => {
  // You can implement your notification system here
  console.error(message);
};

export const logError = (error, context = '') => {
  // Log errors to your error tracking service (e.g., Sentry)
  console.error(`Error in ${context}:`, error);
}; 