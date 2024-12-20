import React from 'react';
import styled from 'styled-components';

const ServiceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ServiceHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${props => props.theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Feature = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;

  i {
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
  }
`;

function LeadsService() {
  return (
    <ServiceContainer>
      <ServiceHeader>
        <h1>Property Leads Service</h1>
        <p>Get high-quality leads for your real estate business</p>
      </ServiceHeader>

      <FeaturesGrid>
        <Feature>
          <i className="fas fa-users"></i>
          <h3>Qualified Leads</h3>
          <p>Access to verified and interested property buyers</p>
        </Feature>
        <Feature>
          <i className="fas fa-chart-line"></i>
          <h3>Lead Analytics</h3>
          <p>Detailed insights and tracking of lead performance</p>
        </Feature>
        <Feature>
          <i className="fas fa-mobile-alt"></i>
          <h3>Mobile App</h3>
          <p>Manage leads on the go with our mobile application</p>
        </Feature>
      </FeaturesGrid>
    </ServiceContainer>
  );
}

export default LeadsService; 