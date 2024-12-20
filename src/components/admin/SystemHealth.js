import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../utils/api';

const Container = styled.div`
  padding: 2rem;
`;

const HealthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const HealthCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => {
      switch (props.status) {
        case 'healthy': return props.theme.colors.success;
        case 'warning': return props.theme.colors.warning;
        case 'error': return props.theme.colors.error;
        default: return props.theme.colors.border;
      }
    }};
  }
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

function SystemHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthMetrics();
    const interval = setInterval(fetchHealthMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchHealthMetrics = async () => {
    try {
      const response = await apiMethods.getSystemHealth();
      setHealth(response.data);
    } catch (error) {
      console.error('Failed to fetch health metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>System Health</h2>

      <HealthGrid>
        <HealthCard>
          <h3>Server Status</h3>
          <StatusIndicator status={health.server.status}>
            {health.server.status.toUpperCase()}
          </StatusIndicator>
          <div>
            <p>CPU Usage: {health.server.cpuUsage}%</p>
            <p>Memory Usage: {health.server.memoryUsage}%</p>
            <p>Uptime: {health.server.uptime}</p>
          </div>
        </HealthCard>

        <HealthCard>
          <h3>Database Status</h3>
          <StatusIndicator status={health.database.status}>
            {health.database.status.toUpperCase()}
          </StatusIndicator>
          <div>
            <p>Connections: {health.database.connections}</p>
            <p>Storage Usage: {health.database.storageUsage}%</p>
            <p>Latency: {health.database.latency}ms</p>
          </div>
        </HealthCard>

        <HealthCard>
          <h3>API Performance</h3>
          <MetricValue>{health.api.requestsPerMinute}</MetricValue>
          <p>Requests per minute</p>
          <p>Average Response Time: {health.api.avgResponseTime}ms</p>
          <p>Error Rate: {health.api.errorRate}%</p>
        </HealthCard>

        <HealthCard>
          <h3>Storage Status</h3>
          <StatusIndicator status={health.storage.status}>
            {health.storage.status.toUpperCase()}
          </StatusIndicator>
          <div>
            <p>Total Space: {health.storage.totalSpace}</p>
            <p>Used Space: {health.storage.usedSpace}</p>
            <p>Free Space: {health.storage.freeSpace}</p>
          </div>
        </HealthCard>
      </HealthGrid>
    </Container>
  );
}

export default SystemHealth; 