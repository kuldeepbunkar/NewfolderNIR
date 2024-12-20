import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ServicesSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
`;

const services = [
  {
    id: 'leads',
    title: 'Property Leads',
    description: 'Get high-quality leads for your real estate business',
    icon: '🎯'
  },
  {
    id: 'construction',
    title: 'Construction',
    description: 'Professional construction and renovation services',
    icon: '🏗️'
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Property financing and loan solutions',
    icon: '💰'
  }
];

function Services() {
  return (
    <ServicesSection>
      <h2>Our Services</h2>
      <Grid>
        {services.map(service => (
          <ServiceCard key={service.id} to={`/services/${service.id}`}>
            <div style={{ fontSize: '2rem' }}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </ServiceCard>
        ))}
      </Grid>
    </ServicesSection>
  );
}

export default Services; 