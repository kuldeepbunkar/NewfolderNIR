import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
`;

const ServiceTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ViewDetailsButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }
`;

function Services() {
  const services = [
    {
      id: 'leads',
      title: 'Property Leads',
      description: 'Get high-quality property leads with our comprehensive lead generation service. Choose from flexible plans that suit your business needs.',
      image: '/images/leads.jpg',
      link: '/services/leads'
    },
    {
      id: 'construction',
      title: 'Construction Services',
      description: 'Professional construction and renovation services for all your property needs. From planning to execution, we handle it all.',
      image: '/images/construction.jpg',
      link: '/services/construction'
    },
    {
      id: 'finance',
      title: 'Financial Services',
      description: 'Easy loan solutions and financial services to help you achieve your property goals. Competitive rates and quick processing.',
      image: '/images/finance.jpg',
      link: '/services/finance'
    },
    {
      id: 'brand',
      title: 'Brand Promotion',
      description: 'Promote your real estate brand effectively with our marketing solutions. Reach your target audience and grow your business.',
      image: '/images/brand.jpg',
      link: '/services/brand'
    }
  ];

  return (
    <ServicesContainer>
      <PageTitle>Our Services</PageTitle>
      <ServiceGrid>
        {services.map(service => (
          <ServiceCard key={service.id}>
            <ServiceImage image={service.image} />
            <ServiceContent>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ViewDetailsButton to={service.link}>View Details</ViewDetailsButton>
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServiceGrid>
    </ServicesContainer>
  );
}

export default Services; 