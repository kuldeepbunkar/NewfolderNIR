import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 2rem 0;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Category = styled.div`
  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    i {
      color: #3498db;
    }
  }
`;

const AmenityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    margin-bottom: 0.8rem;

    i {
      color: #27ae60;
    }
  }
`;

const amenityCategories = {
  basic: {
    icon: 'fas fa-home',
    title: 'Basic Amenities'
  },
  security: {
    icon: 'fas fa-shield-alt',
    title: 'Security'
  },
  leisure: {
    icon: 'fas fa-swimming-pool',
    title: 'Leisure'
  },
  convenience: {
    icon: 'fas fa-concierge-bell',
    title: 'Convenience'
  }
};

function PropertyAmenities({ amenities }) {
  return (
    <Container>
      <Title>Features & Amenities</Title>
      <Grid>
        {Object.entries(amenities).map(([category, items]) => (
          <Category key={category}>
            <h3>
              <i className={amenityCategories[category].icon}></i>
              {amenityCategories[category].title}
            </h3>
            <AmenityList>
              {items.map((item, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i>
                  {item}
                </li>
              ))}
            </AmenityList>
          </Category>
        ))}
      </Grid>
    </Container>
  );
}

export default PropertyAmenities; 