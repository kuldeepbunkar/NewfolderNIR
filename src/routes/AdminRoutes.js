import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Overview from '../components/admin/dashboard/Overview';
import UserList from '../components/admin/users/UserList';
import PropertyList from '../components/admin/properties/PropertyList';
import SystemHealth from '../components/admin/monitoring/SystemHealth';
import Settings from '../components/admin/settings/General';

function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users/*" element={<UserList />} />
        <Route path="/properties/*" element={<PropertyList />} />
        <Route path="/system/*" element={<SystemHealth />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminRoutes; 