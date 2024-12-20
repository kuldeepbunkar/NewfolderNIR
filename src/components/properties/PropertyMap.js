import React from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin: 2rem 0;
`;

const MapHeader = styled.div`
  margin-bottom: 1rem;

  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
`;

function PropertyMap({ location, nearbyPlaces }) {
  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  const defaultCenter = {
    lat: location.lat || 19.0760,
    lng: location.lng || 72.8777
  };

  return (
    <div>
      <MapHeader>
        <h2>Location & Nearby Places</h2>
        <p>Explore the neighborhood and nearby amenities</p>
      </MapHeader>
      
      <MapContainer>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
          >
            {/* Main Property Marker */}
            <Marker
              position={defaultCenter}
              icon={{
                url: '/images/markers/home-marker.png',
                scaledSize: { width: 40, height: 40 }
              }}
            />

            {/* Nearby Places Markers */}
            {nearbyPlaces?.map((place, index) => (
              <Marker
                key={index}
                position={place.location}
                icon={{
                  url: `/images/markers/${place.type}-marker.png`,
                  scaledSize: { width: 32, height: 32 }
                }}
                title={place.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </MapContainer>
    </div>
  );
}

export default PropertyMap; 