import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../../hooks/useAdmin';
import { useNotification } from '../../../context/NotificationContext';

const Container = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

function GeneralSettings() {
  const { adminSettings, updateSettings } = useAdmin();
  const { addNotification } = useNotification();
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    supportPhone: ''
  });

  useEffect(() => {
    if (adminSettings) {
      setSettings(adminSettings);
    }
  }, [adminSettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateSettings(settings);
    if (success) {
      addNotification('Settings updated successfully', 'success');
    } else {
      addNotification('Failed to update settings', 'error');
    }
  };

  return (
    <Container>
      <h2>General Settings</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Site Name</label>
          <Input
            type="text"
            value={settings.siteName}
            onChange={e => setSettings({...settings, siteName: e.target.value})}
          />
        </FormGroup>
        {/* More settings fields */}
        <button type="submit">Save Changes</button>
      </Form>
    </Container>
  );
}

export default GeneralSettings; 