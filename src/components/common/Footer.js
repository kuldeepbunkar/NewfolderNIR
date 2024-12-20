import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #3498db;
    }
  }
`;

const CompanyInfo = styled(FooterSection)`
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    display: block;
  }

  p {
    color: #ecf0f1;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #34495e;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: #3498db;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #34495e;
  color: #ecf0f1;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <CompanyInfo>
          <Link to="/" className="logo">
            The Next Innovation Realty
          </Link>
          <p>
            Leading the way in real estate innovation and customer service excellence. 
            Your trusted partner in property solutions.
          </p>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </SocialLinks>
        </CompanyInfo>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Services</h3>
          <ul>
            <li><Link to="/services/leads">Property Leads</Link></li>
            <li><Link to="/services/construction">Construction</Link></li>
            <li><Link to="/services/finance">Financial Services</Link></li>
            <li><Link to="/services/brand">Brand Promotion</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i> 123 Business Avenue,
              Mumbai, India
            </li>
            <li>
              <i className="fas fa-phone"></i> +91 123 456 7890
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@nextinnovation.com
            </li>
          </ul>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} The Next Innovation Realty. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer; 