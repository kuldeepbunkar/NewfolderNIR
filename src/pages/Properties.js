import React, { useState } from 'react';
import styled from 'styled-components';
import PropertyList from '../components/properties/PropertyList';
import SearchFilters from '../components/properties/SearchFilters';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FiltersContainer = styled.div`
  margin-bottom: 2rem;
`;

function Properties() {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'all',
    priceRange: { min: '', max: '' },
    bedrooms: 'any',
    sortBy: 'newest'
  });

  const properties = [
    {
      id: 1,
      title: "Luxury Villa in Bandra",
      type: "Villa",
      price: 25000000,
      location: "Bandra West, Mumbai",
      bedrooms: 4,
      bathrooms: 5,
      area: 3500,
      image: "/images/properties/villa1.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Modern Apartment in Andheri",
      type: "Apartment",
      price: 12000000,
      location: "Andheri East, Mumbai",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      image: "/images/properties/apartment1.jpg"
    },
    // Add more properties...
  ];

  return (
    <Container>
      <Header>
        <Title>Available Properties</Title>
        <Description>
          Discover your perfect property from our extensive collection of premium real estate listings.
        </Description>
      </Header>

      <FiltersContainer>
        <SearchFilters filters={filters} setFilters={setFilters} />
      </FiltersContainer>

      <PropertyList properties={properties} />
    </Container>
  );
}

export default Properties; 