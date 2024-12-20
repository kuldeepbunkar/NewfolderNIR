import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiMethods } from '../utils/api';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await apiMethods.getProperties(filters);
      setProperties(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = async (id) => {
    try {
      setLoading(true);
      const response = await apiMethods.getPropertyDetails(id);
      return response.data;
    } catch (err) {
      setError('Failed to fetch property details');
      console.error('Error fetching property:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider 
      value={{ 
        properties, 
        loading, 
        error, 
        fetchProperties, 
        getPropertyById 
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext); 