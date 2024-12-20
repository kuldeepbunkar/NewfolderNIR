import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { useNotification } from '../../../hooks/useNotification';

const Container = styled.div`
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  background: ${props => props.theme.colors.background.dark};
  color: white;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.danger ? props.theme.colors.error : props.theme.colors.primary};
  color: white;
  margin-right: 0.5rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiMethods.getUsers();
      setUsers(response.data);
    } catch (error) {
      addNotification('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiMethods.deleteUser(userId);
        addNotification('User deleted successfully', 'success');
        fetchUsers();
      } catch (error) {
        addNotification('Failed to delete user', 'error');
      }
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await apiMethods.updateUserRole(userId, newRole);
      addNotification('User role updated successfully', 'success');
      fetchUsers();
    } catch (error) {
      addNotification('Failed to update user role', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>User Management</h2>
      <FilterBar>
        <input type="text" placeholder="Search users..." />
        <select>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
      </FilterBar>

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <select
                  value={user.role}
                  onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </Td>
              <Td>{user.status}</Td>
              <Td>
                <Button onClick={() => handleEditUser(user._id)}>
                  Edit
                </Button>
                <Button danger onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserManagement; 