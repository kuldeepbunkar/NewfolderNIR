import React from 'react';
import styled from 'styled-components';
import PropertyCard from './PropertyCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  grid-column: 1 / -1;

  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
`;

const LoadMore = styled.button`
  display: block;
  margin: 3rem auto 0;
  padding: 1rem 2rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #2980b9;
  }
`;

function PropertyList({ properties }) {
  return (
    <>
      <ListContainer>
        {properties.length > 0 ? (
          properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <NoResults>
            <h3>No Properties Found</h3>
            <p>Try adjusting your search criteria</p>
          </NoResults>
        )}
      </ListContainer>
      {properties.length > 0 && (
        <LoadMore>Load More Properties</LoadMore>
      )}
    </>
  );
}

export default PropertyList; 