import React from 'react';
import styled from 'styled-components';
import { AdminProvider } from '../context/AdminContext';
import AdminSidebar from '../components/admin/Sidebar';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;

const Content = styled.main`
  background: ${props => props.theme.colors.background.light};
  padding: 2rem;
`;

function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <Layout>
        <AdminSidebar />
        <Content>{children}</Content>
      </Layout>
    </AdminProvider>
  );
}

export default AdminLayout; 