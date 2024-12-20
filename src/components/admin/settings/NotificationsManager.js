import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { useNotification } from '../../../context/NotificationContext';

const Container = styled.div`
  padding: 2rem;
`;

const NotificationGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const NotificationCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const SettingsForm = styled.form`
  display: grid;
  gap: 1rem;
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  input {
    display: none;
  }

  .switch {
    width: 48px;
    height: 24px;
    background: ${props => props.enabled ? props.theme.colors.success : props.theme.colors.border};
    border-radius: 12px;
    position: relative;
    transition: background 0.3s;

    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      top: 2px;
      left: ${props => props.enabled ? '26px' : '2px'};
      transition: left 0.3s;
    }
  }
`;

function NotificationsManager() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    notificationTypes: {
      userRegistration: true,
      propertyListing: true,
      reports: false
    }
  });

  const { addNotification } = useNotification();

  const handleToggle = async (key, value) => {
    try {
      await apiMethods.updateNotificationSettings({ [key]: value });
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
      addNotification('Settings updated successfully', 'success');
    } catch (error) {
      addNotification('Failed to update settings', 'error');
    }
  };

  return (
    <Container>
      <h2>Notifications Settings</h2>
      <NotificationGrid>
        <NotificationCard>
          <h3>Email Notifications</h3>
          <SettingsForm>
            <ToggleSwitch enabled={settings.emailNotifications}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={e => handleToggle('emailNotifications', e.target.checked)}
              />
              <div className="switch"></div>
              Enable Email Notifications
            </ToggleSwitch>
          </SettingsForm>
        </NotificationCard>

        <NotificationCard>
          <h3>Push Notifications</h3>
          <SettingsForm>
            <ToggleSwitch enabled={settings.pushNotifications}>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={e => handleToggle('pushNotifications', e.target.checked)}
              />
              <div className="switch"></div>
              Enable Push Notifications
            </ToggleSwitch>
          </SettingsForm>
        </NotificationCard>
      </NotificationGrid>
    </Container>
  );
}

export default NotificationsManager; 