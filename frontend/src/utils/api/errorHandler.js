export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data.message || 'Server error occurred';
    throw new Error(message);
  } else if (error.request) {
    // Request made but no response
    throw new Error('No response from server');
  } else {
    // Request setup error
    throw new Error('Error setting up request');
  }
}; 