import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../utils/api';
import { formatDateTime } from '../../utils/formatters';

const Container = styled.div`
  padding: 2rem;
`;

const LogsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
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

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  const fetchLogs = async () => {
    try {
      const response = await apiMethods.getActivityLogs({ type: filter });
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Activity Logs</h2>

      <FilterBar>
        <Select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Activities</option>
          <option value="user">User Activities</option>
          <option value="property">Property Activities</option>
          <option value="system">System Activities</option>
        </Select>
      </FilterBar>

      <LogsTable>
        <thead>
          <tr>
            <Th>Timestamp</Th>
            <Th>User</Th>
            <Th>Action</Th>
            <Th>Details</Th>
            <Th>IP Address</Th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <Td>{formatDateTime(log.timestamp)}</Td>
              <Td>{log.user?.name || 'System'}</Td>
              <Td>{log.action}</Td>
              <Td>{log.details}</Td>
              <Td>{log.ipAddress}</Td>
            </tr>
          ))}
        </tbody>
      </LogsTable>
    </Container>
  );
}

export default ActivityLogs; 