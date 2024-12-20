import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PropertyMap from '../components/properties/PropertyMap';
import SimilarProperties from '../components/properties/SimilarProperties';
import PropertyGallery from '../components/properties/PropertyGallery';
import PropertyAmenities from '../components/properties/PropertyAmenities';
import PropertyReviews from '../components/properties/PropertyReviews';
import PropertyScheduleTour from '../components/properties/PropertyScheduleTour';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ImageGallery = styled.div`
  margin-bottom: 2rem;
`;

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const Thumbnail = styled.div`
  height: 100px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.7};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PropertyInfo = styled.div`
  h1 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 2rem;
    color: #3498db;
    margin-bottom: 2rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
    }
  }

  .description {
    color: #666;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
`;

const ContactForm = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 2rem;

  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }

  button {
    width: 100%;
    padding: 1rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #2980b9;
    }
  }
`;

function PropertyDetails() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // Mock property data (in real app, fetch from API)
  const property = {
    id: 1,
    title: "Luxury Villa in Bandra",
    price: 25000000,
    location: "Bandra West, Mumbai",
    bedrooms: 4,
    bathrooms: 5,
    area: 3500,
    description: `
      This luxurious villa offers the perfect blend of comfort and elegance. 
      Featuring spacious rooms, modern amenities, and stunning views, this 
      property is perfect for those seeking a premium lifestyle.
    `,
    images: [
      "/images/properties/villa1.jpg",
      "/images/properties/villa1-2.jpg",
      "/images/properties/villa1-3.jpg",
      "/images/properties/villa1-4.jpg"
    ],
    features: [
      "Swimming Pool",
      "Garden",
      "Parking",
      "Security",
      "Gym",
      "Power Backup"
    ]
  };

  return (
    <Container>
      <PropertyGallery images={property.images} />
      
      <ContentGrid>
        <div>
          <PropertyInfo>
            <h1>{property.title}</h1>
            <div className="price">₹{property.price.toLocaleString()}</div>
            
            <div className="features">
              <div className="feature">
                <i className="fas fa-bed"></i> {property.bedrooms} Bedrooms
              </div>
              <div className="feature">
                <i className="fas fa-bath"></i> {property.bathrooms} Bathrooms
              </div>
              <div className="feature">
                <i className="fas fa-vector-square"></i> {property.area} sq.ft
              </div>
              <div className="feature">
                <i className="fas fa-map-marker-alt"></i> {property.location}
              </div>
            </div>

            <div className="description">{property.description}</div>

            <PropertyAmenities amenities={property.amenities} />
          </PropertyInfo>
          <PropertyReviews />
        </div>
        
        <div>
          <PropertyScheduleTour />
          <ContactForm>
            <h2>Contact Agent</h2>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="tel" placeholder="Your Phone" />
            <textarea 
              rows="4" 
              placeholder="I'm interested in this property. Please contact me."
            ></textarea>
            <button>Send Message</button>
          </ContactForm>
        </div>
      </ContentGrid>

      <PropertyMap 
        location={property.location}
        nearbyPlaces={property.nearbyPlaces}
      />
      
      <SimilarProperties
        currentProperty={property}
        similarProperties={similarProperties}
      />
    </Container>
  );
}

export default PropertyDetails; 