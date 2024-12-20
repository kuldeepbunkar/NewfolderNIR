import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.div`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  
  h3 {
    margin: 1rem 0;
  }
  
  p {
    color: #666;
  }
`;

function FeaturedServices() {
  const services = [
    {
      title: "Property Leads",
      description: "Get quality leads for your property business",
      icon: "🏠"
    },
    {
      title: "Construction Services",
      description: "Professional construction and renovation services",
      icon: "🏗️"
    },
    {
      title: "Financial Services",
      description: "Easy loan and financial solutions",
      icon: "💰"
    },
    {
      title: "Brand Promotion",
      description: "Promote your real estate brand effectively",
      icon: "📢"
    }
  ];

  return (
    <ServicesContainer>
      <Title>Our Services</Title>
      <ServiceGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <div style={{ fontSize: '3rem' }}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </ServiceCard>
        ))}
      </ServiceGrid>
    </ServicesContainer>
  );
}

export default FeaturedServices; 