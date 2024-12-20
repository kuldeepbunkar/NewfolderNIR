import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { formatDistanceToNow } from 'date-fns';

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
  display: flex;
  gap: 1rem;
  align-items: center;

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .details {
    flex: 1;
  }

  .time {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

function UserActivityMonitor() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    timeRange: 'today'
  });

  useEffect(() => {
    fetchActivities();
    const interval = setInterval(fetchActivities, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [filters]);

  const fetchActivities = async () => {
    try {
      const response = await apiMethods.getUserActivities(filters);
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
      
      <FilterBar>
        <select
          value={filters.type}
          onChange={e => setFilters({...filters, type: e.target.value})}
        >
          <option value="all">All Activities</option>
          <option value="login">Logins</option>
          <option value="property">Property Actions</option>
          <option value="profile">Profile Updates</option>
        </select>

        <select
          value={filters.timeRange}
          onChange={e => setFilters({...filters, timeRange: e.target.value})}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </FilterBar>

      <ActivityGrid>
        {activities.map(activity => (
          <ActivityCard key={activity.id}>
            <div className="user-info">
              <img
                src={activity.user.avatar || '/default-avatar.png'}
                alt={activity.user.name}
                className="avatar"
              />
              <div className="details">
                <div><strong>{activity.user.name}</strong></div>
                <div>{activity.description}</div>
              </div>
            </div>
            <div className="time">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </div>
          </ActivityCard>
        ))}
      </ActivityGrid>
    </Container>
  );
}

export default UserActivityMonitor; 