import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { formatDateTime } from '../../../utils/formatters';

const Container = styled.div`
  padding: 2rem;
`;

const LogsContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
`;

const LogEntry = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  align-items: start;

  &:last-child {
    border-bottom: none;
  }

  .timestamp {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.875rem;
  }

  .level {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: bold;
    background: ${props => {
      switch (props.level) {
        case 'error': return props.theme.colors.error;
        case 'warning': return props.theme.colors.warning;
        default: return props.theme.colors.info;
      }
    }};
    color: white;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

function SystemLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    level: 'all',
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    try {
      const response = await apiMethods.getSystemLogs(filters);
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
      <h2>System Logs</h2>
      
      <FilterBar>
        <select
          value={filters.level}
          onChange={e => setFilters({...filters, level: e.target.value})}
        >
          <option value="all">All Levels</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </FilterBar>

      <LogsContainer>
        {logs.map(log => (
          <LogEntry key={log.id} level={log.level}>
            <span className="timestamp">{formatDateTime(log.timestamp)}</span>
            <span className="level">{log.level}</span>
            <span className="message">{log.message}</span>
            <span className="source">{log.source}</span>
          </LogEntry>
        ))}
      </LogsContainer>
    </Container>
  );
}

export default SystemLogs; 