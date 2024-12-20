import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import UserForm from './UserForm';

const Container = styled.div`
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiMethods.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>User Management</h2>
      {/* User list and management UI */}
    </Container>
  );
}

export default UserList; 