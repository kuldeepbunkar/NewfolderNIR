import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DashboardStats from './DashboardStats';
import UserManagement from './UserManagement';
import PropertyApproval from './PropertyApproval';
import ReportsSection from './ReportsSection';

const AdminContainer = styled.div`
  display: grid;
  gap: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  cursor: pointer;
`;

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch dashboard stats
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    // API call to get stats
  };

  return (
    <AdminContainer>
      <TabContainer>
        <Tab 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          Dashboard
        </Tab>
        <Tab 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </Tab>
        <Tab 
          active={activeTab === 'properties'} 
          onClick={() => setActiveTab('properties')}
        >
          Properties
        </Tab>
        <Tab 
          active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </Tab>
      </TabContainer>

      {activeTab === 'stats' && <DashboardStats stats={stats} />}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'properties' && <PropertyApproval />}
      {activeTab === 'reports' && <ReportsSection />}
    </AdminContainer>
  );
}

export default AdminDashboard; 