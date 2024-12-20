import React from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../context/AdminContext';

const SidebarContainer = styled.aside`
  background: white;
  padding: 2rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
`;

const MenuItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text.primary};
  background: ${props => props.active ? props.theme.colors.background.light : 'transparent'};
  border-radius: 4px;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.background.light};
  }
`;

function Sidebar() {
  const { activePanel, setActivePanel } = useAdmin();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'users', label: 'Users', icon: 'users' },
    { id: 'properties', label: 'Properties', icon: 'building' },
    { id: 'reports', label: 'Reports', icon: 'chart-bar' }
  ];

  return (
    <SidebarContainer>
      {menuItems.map(item => (
        <MenuItem
          key={item.id}
          active={activePanel === item.id}
          onClick={() => setActivePanel(item.id)}
        >
          <i className={`fas fa-${item.icon} mr-2`}></i>
          {item.label}
        </MenuItem>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar; 