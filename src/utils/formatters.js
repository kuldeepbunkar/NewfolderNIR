import { format, formatDistance } from 'date-fns';

// Price formatter
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Date formatters
export const formatDate = (date) => {
  return format(new Date(date), 'MMMM d, yyyy');
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMMM d, yyyy h:mm a');
};

export const formatTimeAgo = (date) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

// Area formatter
export const formatArea = (area) => {
  return `${area.toLocaleString()} sq.ft`;
};

// Phone number formatter
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+91 ${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
};

// Address formatter
export const formatAddress = (address) => {
  const { street, city, state, pincode } = address;
  return `${street}, ${city}, ${state} - ${pincode}`;
};

// Review rating formatter
export const formatRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

// Number formatter with suffix
export const formatNumber = (num) => {
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
  if (num >= 1000) return `${(num / 1000).toFixed(2)} K`;
  return num.toString();
}; 