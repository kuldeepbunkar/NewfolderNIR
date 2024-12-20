import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroContainer = styled.div`
  height: 80vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('/images/hero-bg.jpg');
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
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

function Hero() {
  return (
    <HeroContainer>
      <Content>
        <h1>Find Your Dream Property</h1>
        <p>Discover the perfect property that matches your lifestyle and needs</p>
        <CTAButton to="/properties">Browse Properties</CTAButton>
      </Content>
    </HeroContainer>
  );
}

export default Hero; 