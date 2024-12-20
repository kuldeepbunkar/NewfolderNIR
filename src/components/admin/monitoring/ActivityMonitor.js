import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { formatDateTime } from '../../../utils/formatters';

const Container = styled.div`
  padding: 2rem;
`;

const ActivityGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const ActivityCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;

  .user {
    font-weight: bold;
  }

  .action {
    color: ${props => props.theme.colors.text.secondary};
  }

  .time {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`;

function ActivityMonitor() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
    const interval = setInterval(fetchActivities, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await apiMethods.getUserActivities();
      setActivities(response.data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>User Activity Monitor</h2>
      <ActivityGrid>
        {activities.map(activity => (
          <ActivityCard key={activity.id}>
            <div className="user">{activity.user.name}</div>
            <div className="action">{activity.action}</div>
            <div className="time">{formatDateTime(activity.timestamp)}</div>
          </ActivityCard>
        ))}
      </ActivityGrid>
    </Container>
  );
}

export default ActivityMonitor; 