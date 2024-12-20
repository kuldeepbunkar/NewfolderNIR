import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
    color: #2c3e50;
  }
  
  select, input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: 1rem;
  
  input {
    width: 100%;
  }
`;

const ApplyButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  
  &:hover {
    background: #2980b9;
  }
`;

function SearchFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [name]: value
      }
    }));
  };

  return (
    <FiltersContainer>
      <FilterGrid>
        <FilterGroup>
          <label>Property Type</label>
          <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Location</label>
          <select name="location" value={filters.location} onChange={handleChange}>
            <option value="">All Locations</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
          </select>
        </FilterGroup>

        <FilterGroup>
          <label>Price Range</label>
          <PriceRange>
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={filters.priceRange.min}
              onChange={handlePriceChange}
            />
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={filters.priceRange.max}
              onChange={handlePriceChange}
            />
          </PriceRange>
        </FilterGroup>
      </FilterGrid>
      <ApplyButton>Apply Filters</ApplyButton>
    </FiltersContainer>
  );
}

export default SearchFilters; 