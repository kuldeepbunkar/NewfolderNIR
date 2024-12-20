import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  display: block;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeaturedTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #e74c3c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: #2c3e50;
  margin: 0 0 1rem;
  font-size: 1.2rem;
`;

const Price = styled.div`
  color: #3498db;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Features = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;

  i {
    color: #3498db;
  }
`;

function PropertyCard({ property }) {
  const { id, title, price, location, bedrooms, bathrooms, area, image, featured } = property;

  return (
    <Card to={`/properties/${id}`}>
      <ImageContainer>
        <Image src={image} alt={title} />
        {featured && <FeaturedTag>Featured</FeaturedTag>}
      </ImageContainer>
      
      <Content>
        <Title>{title}</Title>
        <Price>₹{price.toLocaleString()}</Price>
        
        <Features>
          <div>
            <i className="fas fa-bed"></i>
            {bedrooms} Beds
          </div>
          <div>
            <i className="fas fa-bath"></i>
            {bathrooms} Baths
          </div>
          <div>
            <i className="fas fa-vector-square"></i>
            {area} sq.ft
          </div>
        </Features>

        <Location>
          <i className="fas fa-map-marker-alt"></i>
          {location}
        </Location>
      </Content>
    </Card>
  );
}

export default PropertyCard; 