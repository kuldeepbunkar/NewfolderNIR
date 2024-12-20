const config = {
  development: {
    apiUrl: 'http://localhost:5000',
    stripeKey: 'your_stripe_test_key',
    googleMapsKey: 'your_google_maps_key'
  },
  production: {
    apiUrl: 'https://api.nextinnovation.com',
    stripeKey: process.env.STRIPE_LIVE_KEY,
    googleMapsKey: process.env.GOOGLE_MAPS_KEY
  }
};

export default config[process.env.NODE_ENV || 'development']; 