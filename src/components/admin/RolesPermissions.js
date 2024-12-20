import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../utils/api';

const Container = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
`;

const RolesList = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const PermissionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

function RolesPermissions() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchRolesAndPermissions();
  }, []);

  const fetchRolesAndPermissions = async () => {
    const [rolesRes, permsRes] = await Promise.all([
      apiMethods.getRoles(),
      apiMethods.getPermissions()
    ]);
    setRoles(rolesRes.data);
    setPermissions(permsRes.data);
  };

  return (
    <Container>
      <h2>Roles & Permissions</h2>
      <Grid>
        {/* Roles and permissions management UI */}
      </Grid>
    </Container>
  );
}

export default RolesPermissions; 