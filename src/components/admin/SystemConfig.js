import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../utils/api';

const Container = styled.div`
  padding: 2rem;
`;

const ConfigGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ConfigCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

function SystemConfig() {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await apiMethods.getSystemConfig();
      setConfig(response.data);
    } catch (error) {
      console.error('Failed to fetch config:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>System Configuration</h2>
      {/* Configuration UI */}
    </Container>
  );
}

export default SystemConfig; 