import React from 'react';

// Image optimization
export const optimizeImage = (url, { width, height, quality = 80 }) => {
  if (!url) return '';
  if (url.includes('cloudinary')) {
    return url.replace('/upload/', `/upload/w_${width},h_${height},q_${quality}/`);
  }
  return url;
};

// Lazy loading components
export const lazyLoad = (importFunc) => {
  const LazyComponent = React.lazy(importFunc);
  return (props) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Memoization helper
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}; 