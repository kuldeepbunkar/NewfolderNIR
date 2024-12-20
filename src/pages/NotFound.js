import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: #3498db;
  margin: 0;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin: 1rem 0;
`;

const Description = styled.p`
  color: #666;
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 100%;
  margin-bottom: 2rem;
`;

function NotFound() {
  return (
    <Container>
      <Image src="/images/404.svg" alt="404 Illustration" />
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Description>
        Oops! The page you are looking for might have been removed, had its name 
        changed, or is temporarily unavailable.
      </Description>
      <HomeButton to="/">Back to Home</HomeButton>
    </Container>
  );
}

export default NotFound; 