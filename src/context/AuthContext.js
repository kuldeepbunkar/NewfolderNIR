import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiMethods } from '../utils/api';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiMethods.login(credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwt_decode(token);
      setUser(decoded);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 