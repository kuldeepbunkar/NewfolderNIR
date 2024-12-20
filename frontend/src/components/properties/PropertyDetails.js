import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { apiMethods } from '../../utils/api';
import PropertyMap from './PropertyMap';
import { formatCurrency } from '../../utils/formatters';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 195px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: ${props => props.theme.colors.background.light};
  border-radius: 4px;
`;

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await apiMethods.getProperty(id);
      setProperty(response.data);
      setMainImage(0);
    } catch (error) {
      console.error('Failed to fetch property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <Container>
      <ImageGallery>
        <MainImage src={property.images[mainImage].url} alt={property.title} />
        <ThumbnailGrid>
          {property.images.slice(0, 4).map((image, index) => (
            <Thumbnail
              key={index}
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(index)}
            />
          ))}
        </ThumbnailGrid>
      </ImageGallery>

      <InfoGrid>
        <div>
          <h1>{property.title}</h1>
          <p>{property.location.address}</p>
          <h2>{formatCurrency(property.price)}</h2>
          
          <Features>
            <Feature>
              <i className="fas fa-bed"></i>
              <span>{property.features.bedrooms} Bedrooms</span>
            </Feature>
            <Feature>
              <i className="fas fa-bath"></i>
              <span>{property.features.bathrooms} Bathrooms</span>
            </Feature>
            <Feature>
              <i className="fas fa-ruler-combined"></i>
              <span>{property.features.area} sqft</span>
            </Feature>
          </Features>

          <div>
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>
        </div>

        <div>
          <PropertyMap location={property.location} />
          {/* Contact form or agent info can go here */}
        </div>
      </InfoGrid>
    </Container>
  );
}

export default PropertyDetails; 