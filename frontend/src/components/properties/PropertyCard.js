import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

const Card = styled(Link)`
  display: block;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: ${props => props.theme.colors.text.primary};
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const Details = styled.div`
  display: flex;
  gap: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`;

function PropertyCard({ property }) {
  return (
    <Card to={`/properties/${property._id}`}>
      <Image src={property.images[0]?.url} alt={property.title} />
      <Content>
        <Title>{property.title}</Title>
        <Price>{formatCurrency(property.price)}</Price>
        <Details>
          <span>{property.features.bedrooms} beds</span>
          <span>{property.features.bathrooms} baths</span>
          <span>{property.features.area} sqft</span>
        </Details>
      </Content>
    </Card>
  );
}

export default PropertyCard; 