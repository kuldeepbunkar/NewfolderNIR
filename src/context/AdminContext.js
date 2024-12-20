import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [activePanel, setActivePanel] = useState('overview');
  const [adminSettings, setAdminSettings] = useState({});

  const value = {
    activePanel,
    setActivePanel,
    adminSettings,
    setAdminSettings
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
} 