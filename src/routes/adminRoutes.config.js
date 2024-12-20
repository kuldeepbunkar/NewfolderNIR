import { lazy } from 'react';

const Overview = lazy(() => import('../components/admin/dashboard/Overview'));
const UserManagement = lazy(() => import('../components/admin/users/UserManagement'));
const PropertyManagement = lazy(() => import('../components/admin/properties/PropertyManagement'));
const Settings = lazy(() => import('../components/admin/settings/Settings'));
const Reports = lazy(() => import('../components/admin/reports/Reports'));
const SystemHealth = lazy(() => import('../components/admin/monitoring/SystemHealth'));
const ErrorLogs = lazy(() => import('../components/admin/monitoring/ErrorLogs'));

export const adminRoutes = [
  {
    path: '',
    element: Overview,
    title: 'Dashboard',
    icon: 'dashboard'
  },
  {
    path: 'users',
    element: UserManagement,
    title: 'Users',
    icon: 'users'
  },
  {
    path: 'properties',
    element: PropertyManagement,
    title: 'Properties',
    icon: 'building'
  },
  {
    path: 'reports',
    element: Reports,
    title: 'Reports',
    icon: 'chart-bar'
  },
  {
    path: 'settings',
    element: Settings,
    title: 'Settings',
    icon: 'cog'
  },
  {
    path: 'system',
    element: SystemHealth,
    title: 'System Health',
    icon: 'heartbeat'
  },
  {
    path: 'logs',
    element: ErrorLogs,
    title: 'Error Logs',
    icon: 'exclamation-triangle'
  }
]; 