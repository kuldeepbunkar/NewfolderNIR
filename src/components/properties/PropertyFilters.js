import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#2980b9' : '#f8f9fa'};
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  margin-left: auto;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

function PropertyFilters({ activeFilters, onFilterChange, onSortChange }) {
  const filters = [
    { id: 'all', label: 'All Properties' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'house', label: 'Houses' },
    { id: 'plot', label: 'Plots' },
    { id: 'featured', label: 'Featured' }
  ];

  return (
    <FiltersContainer>
      {filters.map(filter => (
        <FilterButton
          key={filter.id}
          active={activeFilters.includes(filter.id)}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </FilterButton>
      ))}

      <SortSelect onChange={(e) => onSortChange(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="area">Area: Largest First</option>
      </SortSelect>
    </FiltersContainer>
  );
}

export default PropertyFilters; 