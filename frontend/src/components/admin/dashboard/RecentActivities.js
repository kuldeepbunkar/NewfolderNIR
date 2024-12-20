import React from 'react';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { useActivities } from '../../../hooks/useActivities';

const ActivityContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.background.light};
    color: ${props => props.theme.colors.primary};
  }

  .content {
    flex: 1;
  }

  .time {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`;

function RecentActivities() {
  const { activities, loading } = useActivities();

  if (loading) return <div>Loading activities...</div>;

  return (
    <ActivityContainer>
      <h2>Recent Activities</h2>
      <ActivityList>
        {activities.map(activity => (
          <ActivityItem key={activity.id}>
            <div className="icon">
              <i className={`fas fa-${getActivityIcon(activity.type)}`}></i>
            </div>
            <div className="content">
              <div>{activity.description}</div>
              <div className="time">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </div>
            </div>
          </ActivityItem>
        ))}
      </ActivityList>
    </ActivityContainer>
  );
}

function getActivityIcon(type) {
  switch (type) {
    case 'user': return 'user';
    case 'property': return 'home';
    case 'payment': return 'credit-card';
    default: return 'bell';
  }
}

export default RecentActivities; 