export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  errorMessages: {
    default: 'Something went wrong. Please try again later.',
    network: 'Network error. Please check your internet connection.',
    unauthorized: 'Please login to continue.',
    forbidden: 'You do not have permission to perform this action.',
    notFound: 'The requested resource was not found.',
    validation: 'Please check your input and try again.'
  }
};

export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  defaultCenter: {
    lat: 19.0760,
    lng: 72.8777
  },
  defaultZoom: 12,
  options: {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  }
}; 