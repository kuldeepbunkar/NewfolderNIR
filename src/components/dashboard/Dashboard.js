import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import UserDashboard from './UserDashboard';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'agent':
        return <AgentDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <DashboardContainer>
      {renderDashboard()}
    </DashboardContainer>
  );
}

export default Dashboard; 