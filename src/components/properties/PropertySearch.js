import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #2c3e50;
  }

  input, select {
    padding: 0.8rem;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const SearchButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1.5rem;

  &:hover {
    background: #2980b9;
  }
`;

const AdvancedFilters = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const ToggleAdvanced = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.9rem;
  text-decoration: underline;

  &:hover {
    color: #2980b9;
  }
`;

function PropertySearch({ onSearch }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <FormGroup>
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter city, locality..."
            value={searchParams.location}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Property Type</label>
          <select 
            name="propertyType"
            value={searchParams.propertyType}
            onChange={handleChange}
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="plot">Plot</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Price Range</label>
          <PriceRange>
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={searchParams.minPrice}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={searchParams.maxPrice}
              onChange={handleChange}
            />
          </PriceRange>
        </FormGroup>

        <SearchButton type="submit">Search Properties</SearchButton>
      </SearchForm>

      <ToggleAdvanced onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
      </ToggleAdvanced>

      {showAdvanced && (
        <AdvancedFilters>
          <FormGroup>
            <label>Bedrooms</label>
            <select
              name="bedrooms"
              value={searchParams.bedrooms}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Bathrooms</label>
            <select
              name="bathrooms"
              value={searchParams.bathrooms}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Area (sq.ft)</label>
            <input
              type="number"
              name="area"
              placeholder="Minimum area"
              value={searchParams.area}
              onChange={handleChange}
            />
          </FormGroup>
        </AdvancedFilters>
      )}
    </SearchContainer>
  );
}

export default PropertySearch; 