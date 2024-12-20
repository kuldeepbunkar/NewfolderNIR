import { useContext, useCallback } from 'react';
import { AdminContext } from '../context/AdminContext';
import { apiMethods } from '../utils/api';

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }

  const { adminSettings, setAdminSettings } = context;

  const updateSettings = useCallback(async (newSettings) => {
    try {
      await apiMethods.updateAdminSettings(newSettings);
      setAdminSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Failed to update settings:', error);
      return false;
    }
  }, [setAdminSettings]);

  return {
    ...context,
    updateSettings
  };
} 