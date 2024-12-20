export const APP_CONFIG = {
  name: 'Next Innovation Realty',
  description: 'Find your dream property with Next Innovation Realty',
  contact: {
    phone: '+91 123 456 7890',
    email: 'info@nextinnovation.com',
    address: '123 Business Avenue, Mumbai, India'
  },
  social: {
    facebook: 'https://facebook.com/nextinnovation',
    twitter: 'https://twitter.com/nextinnovation',
    instagram: 'https://instagram.com/nextinnovation',
    linkedin: 'https://linkedin.com/company/nextinnovation'
  }
};

export const PROPERTY_TYPES = [
  { id: 'apartment', label: 'Apartment' },
  { id: 'villa', label: 'Villa' },
  { id: 'house', label: 'House' },
  { id: 'plot', label: 'Plot' },
  { id: 'commercial', label: 'Commercial' }
];

export const AMENITIES = [
  { id: 'parking', label: 'Parking', icon: 'car' },
  { id: 'gym', label: 'Gym', icon: 'dumbbell' },
  { id: 'pool', label: 'Swimming Pool', icon: 'swimming-pool' },
  { id: 'security', label: '24/7 Security', icon: 'shield-alt' },
  { id: 'garden', label: 'Garden', icon: 'tree' },
  { id: 'lift', label: 'Lift', icon: 'elevator' }
];

export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'area', label: 'Area: Largest First' }
]; 