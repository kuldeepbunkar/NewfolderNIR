import React from 'react';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';

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
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.theme.colors.background.light};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }

  .content {
    flex: 1;
  }

  .time {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`;

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'user',
      action: 'New user registration',
      user: 'John Doe',
      time: new Date(2024, 0, 15, 14, 30)
    },
    // More activities...
  ];

  return (
    <ActivityContainer>
      <h3>Recent Activity</h3>
      <ActivityList>
        {activities.map(activity => (
          <ActivityItem key={activity.id}>
            <div className="icon">
              <i className={`fas fa-${getActivityIcon(activity.type)}`}></i>
            </div>
            <div className="content">
              <div>{activity.action}</div>
              <div className="time">
                {formatDistanceToNow(activity.time, { addSuffix: true })}
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

export default RecentActivity; 