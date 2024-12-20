import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNotification } from '../../hooks/useNotification';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div`
  min-width: 300px;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.large};
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    font-size: 1.25rem;
    color: ${props => {
      switch (props.type) {
        case 'success': return props.theme.colors.success;
        case 'error': return props.theme.colors.error;
        case 'warning': return props.theme.colors.warning;
        default: return props.theme.colors.info;
      }
    }};
  }

  .close {
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
`;

function NotificationSystem() {
  const { notifications, removeNotification } = useNotification();

  return (
    <NotificationContainer>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} type={notification.type}>
          <div className="icon">
            <i className={`fas fa-${getNotificationIcon(notification.type)}`}></i>
          </div>
          <div className="content">{notification.message}</div>
          <div 
            className="close"
            onClick={() => removeNotification(notification.id)}
          >
            <i className="fas fa-times"></i>
          </div>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
}

function getNotificationIcon(type) {
  switch (type) {
    case 'success': return 'check-circle';
    case 'error': return 'exclamation-circle';
    case 'warning': return 'exclamation-triangle';
    default: return 'info-circle';
  }
}

export default NotificationSystem; 