import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero.jpg';

const HeroContainer = styled.div`
  height: 80vh;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
    url(${heroImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const Content = styled.div`
  max-width: 800px;
  padding: 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const SearchButton = styled(Link)`
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: ${props => props.theme.colors.primary}dd;
  }
`;

function Hero() {
  return (
    <HeroContainer>
      <Content>
        <h1>Find Your Dream Property</h1>
        <p>Discover the perfect property that matches your lifestyle</p>
        <SearchButton to="/properties">Start Searching</SearchButton>
      </Content>
    </HeroContainer>
  );
}

export default Hero; 