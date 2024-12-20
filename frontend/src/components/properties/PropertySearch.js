import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const SearchContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const RangeInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MapContainer = styled.div`
  height: 300px;
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

function PropertySearch() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [location, setLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onSubmit = (data) => {
    const params = new URLSearchParams({
      ...data,
      lat: location?.lat || '',
      lng: location?.lng || ''
    });
    navigate(`/properties/search?${params.toString()}`);
  };

  const onPlaceSelected = () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label>Location</label>
          <Autocomplete
            onLoad={setAutocomplete}
            onPlaceChanged={onPlaceSelected}
          >
            <Input
              type="text"
              placeholder="Enter location"
              {...register('location')}
            />
          </Autocomplete>
        </FormGroup>

        <FormGroup>
          <label>Property Type</label>
          <Select {...register('type')}>
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <label>Price Range</label>
          <RangeInput>
            <Input
              type="number"
              placeholder="Min"
              {...register('minPrice')}
            />
            <Input
              type="number"
              placeholder="Max"
              {...register('maxPrice')}
            />
          </RangeInput>
        </FormGroup>

        <FormGroup>
          <label>Bedrooms</label>
          <Select {...register('bedrooms')}>
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </Select>
        </FormGroup>

        <Button type="submit">Search Properties</Button>
      </Form>

      <MapContainer>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
          libraries={['places']}
        >
          <GoogleMap
            center={location || { lat: 28.6139, lng: 77.2090 }}
            zoom={13}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {/* Map markers can be added here */}
          </GoogleMap>
        </LoadScript>
      </MapContainer>
    </SearchContainer>
  );
}

export default PropertySearch; 