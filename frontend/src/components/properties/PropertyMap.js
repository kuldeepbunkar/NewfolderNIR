import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const MapContainer = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const defaultCenter = {
  lat: 28.6139,  // Default to Delhi
  lng: 77.2090
};

function PropertyMap({ location }) {
  const center = location?.coordinates?.lat ? {
    lat: location.coordinates.lat,
    lng: location.coordinates.lng
  } : defaultCenter;

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </MapContainer>
  );
}

export default PropertyMap; 