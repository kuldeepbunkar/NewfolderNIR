import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  height: 70vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('/images/banner.jpg') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  width: 80%;
  max-width: 800px;
  display: flex;
  gap: 1rem;
  
  input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 4px;
  }
  
  button {
    padding: 1rem 2rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #2980b9;
    }
  }
`;

function Banner() {
  return (
    <BannerContainer>
      <Title>Find Your Dream Property</Title>
      <Subtitle>Discover the perfect property that matches your needs</Subtitle>
      <SearchBar>
        <input type="text" placeholder="Enter location, property type, or keywords..." />
        <button>Search</button>
      </SearchBar>
    </BannerContainer>
  );
}

export default Banner; 