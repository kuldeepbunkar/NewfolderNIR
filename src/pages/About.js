import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
`;

function About() {
  return (
    <AboutContainer>
      <Header>
        <h1>About Next Innovation Realty</h1>
        <p>Your trusted partner in real estate</p>
      </Header>
      {/* Add content */}
    </AboutContainer>
  );
}

export default About; 