import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    
    &:hover {
      color: #3498db;
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <Link to="/">The Next Innovation Realty</Link>
        </Logo>
        <NavLinks>
          <Link to="/properties">Properties</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Login</Link>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 