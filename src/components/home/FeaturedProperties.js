import React from 'react';
import styled from 'styled-components';
import PropertyCard from '../properties/PropertyCard';
import { useProperties } from '../../context/PropertyContext';

const Container = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

function FeaturedProperties() {
  const { properties } = useProperties();
  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);

  return (
    <Container>
      <Header>
        <h2>Featured Properties</h2>
        <p>Discover our handpicked selection of premium properties</p>
      </Header>
      <Grid>
        {featuredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </Grid>
    </Container>
  );
}

export default FeaturedProperties; 