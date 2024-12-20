import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import UserManagement from './UserManagement';
import PropertyManagement from './PropertyManagement';
import ReportsPanel from './ReportsPanel';
import { useAdmin } from '../../context/AdminContext';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;

const MainContent = styled.main`
  padding: 2rem;
  background: ${props => props.theme.colors.background.main};
`;

function AdminDashboard() {
  const { activePanel } = useAdmin();

  const renderPanel = () => {
    switch (activePanel) {
      case 'users':
        return <UserManagement />;
      case 'properties':
        return <PropertyManagement />;
      case 'reports':
        return <ReportsPanel />;
      default:
        return <Overview />;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        {renderPanel()}
      </MainContent>
    </DashboardContainer>
  );
}

export default AdminDashboard; 