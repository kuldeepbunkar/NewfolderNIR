import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: 'all',
    priceRange: {
      min: '',
      max: ''
    },
    bedrooms: 'any',
    bathrooms: 'any',
    area: {
      min: '',
      max: ''
    },
    amenities: [],
    sortBy: 'newest'
  });

  const [searchHistory, setSearchHistory] = useState([]);

  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams
    }));

    // Save to search history
    setSearchHistory(prev => [
      { ...newParams, timestamp: new Date().toISOString() },
      ...prev.slice(0, 4) // Keep only last 5 searches
    ]);
  };

  const clearSearch = () => {
    setSearchParams({
      location: '',
      propertyType: 'all',
      priceRange: {
        min: '',
        max: ''
      },
      bedrooms: 'any',
      bathrooms: 'any',
      area: {
        min: '',
        max: ''
      },
      amenities: [],
      sortBy: 'newest'
    });
  };

  return (
    <SearchContext.Provider 
      value={{ 
        searchParams,
        searchHistory,
        updateSearchParams,
        clearSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext); 