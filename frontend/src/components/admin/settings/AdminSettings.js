import React from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../../hooks/useAdmin';
import { useNotification } from '../../../hooks/useNotification';

const SettingsContainer = styled.div`
  padding: 2rem;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SettingCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;

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

function AdminSettings() {
  const { settings, updateSettings } = useAdmin();
  const { addNotification } = useNotification();

  const handleToggle = async (key, value) => {
    try {
      await updateSettings({ [key]: value });
      addNotification('Settings updated successfully', 'success');
    } catch (error) {
      addNotification('Failed to update settings', 'error');
    }
  };

  return (
    <SettingsContainer>
      <h2>Admin Settings</h2>
      <SettingsGrid>
        <SettingCard>
          <h3>System Settings</h3>
          <ToggleSwitch enabled={settings.maintenanceMode}>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={e => handleToggle('maintenanceMode', e.target.checked)}
            />
            <div className="switch"></div>
            Maintenance Mode
          </ToggleSwitch>
          
          <ToggleSwitch enabled={settings.userRegistration}>
            <input
              type="checkbox"
              checked={settings.userRegistration}
              onChange={e => handleToggle('userRegistration', e.target.checked)}
            />
            <div className="switch"></div>
            Allow User Registration
          </ToggleSwitch>
        </SettingCard>

        {/* Add more setting cards as needed */}
      </SettingsGrid>
    </SettingsContainer>
  );
}

export default AdminSettings; 