import React, { useState } from 'react';
import styled from 'styled-components';
import { useNotification } from '../../context/NotificationContext';
import { apiMethods } from '../../utils/api';

const Container = styled.div`
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

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.8rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function SettingsPanel() {
  const [settings, setSettings] = useState({
    siteName: 'Next Innovation Realty',
    contactEmail: 'contact@nextinnovation.com',
    phoneNumber: '+91 123-456-7890',
    googleMapsKey: '',
    stripeKey: '',
    emailSettings: {
      smtpHost: '',
      smtpPort: '',
      smtpUser: '',
      smtpPass: ''
    }
  });

  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiMethods.updateSettings(settings);
      addNotification('Settings updated successfully', 'success');
    } catch (error) {
      addNotification('Failed to update settings', 'error');
    }
  };

  return (
    <Container>
      <h2>System Settings</h2>
      <SettingsGrid>
        <SettingCard>
          <h3>General Settings</h3>
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Site Name</label>
              <Input
                type="text"
                value={settings.siteName}
                onChange={e => setSettings({
                  ...settings,
                  siteName: e.target.value
                })}
              />
            </div>
            <div>
              <label>Contact Email</label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={e => setSettings({
                  ...settings,
                  contactEmail: e.target.value
                })}
              />
            </div>
            <div>
              <label>Phone Number</label>
              <Input
                type="tel"
                value={settings.phoneNumber}
                onChange={e => setSettings({
                  ...settings,
                  phoneNumber: e.target.value
                })}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </Form>
        </SettingCard>

        <SettingCard>
          <h3>API Keys</h3>
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Google Maps API Key</label>
              <Input
                type="password"
                value={settings.googleMapsKey}
                onChange={e => setSettings({
                  ...settings,
                  googleMapsKey: e.target.value
                })}
              />
            </div>
            <div>
              <label>Stripe Secret Key</label>
              <Input
                type="password"
                value={settings.stripeKey}
                onChange={e => setSettings({
                  ...settings,
                  stripeKey: e.target.value
                })}
              />
            </div>
            <Button type="submit">Update Keys</Button>
          </Form>
        </SettingCard>

        <SettingCard>
          <h3>Email Configuration</h3>
          <Form onSubmit={handleSubmit}>
            <div>
              <label>SMTP Host</label>
              <Input
                type="text"
                value={settings.emailSettings.smtpHost}
                onChange={e => setSettings({
                  ...settings,
                  emailSettings: {
                    ...settings.emailSettings,
                    smtpHost: e.target.value
                  }
                })}
              />
            </div>
            <div>
              <label>SMTP Port</label>
              <Input
                type="number"
                value={settings.emailSettings.smtpPort}
                onChange={e => setSettings({
                  ...settings,
                  emailSettings: {
                    ...settings.emailSettings,
                    smtpPort: e.target.value
                  }
                })}
              />
            </div>
            <Button type="submit">Save Email Settings</Button>
          </Form>
        </SettingCard>
      </SettingsGrid>
    </Container>
  );
}

export default SettingsPanel; 