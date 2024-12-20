import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const NotificationItem = styled.div`
  min-width: 300px;
  margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 4px;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return props.theme.colors.success;
      case 'error': return props.theme.colors.error;
      case 'warning': return props.theme.colors.warning;
      default: return props.theme.colors.primary;
    }
  }};
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  animation: ${props => props.isExiting ? slideOut : slideIn} 0.3s ease forwards;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0 5px;
  font-size: 1.2rem;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

function Notification({ notifications, removeNotification }) {
  return (
    <NotificationContainer>
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id} 
          type={notification.type}
          isExiting={notification.isExiting}
        >
          <span>{notification.message}</span>
          <CloseButton onClick={() => removeNotification(notification.id)}>
            ×
          </CloseButton>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
}

export default Notification; 