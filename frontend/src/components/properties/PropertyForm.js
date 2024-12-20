import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { apiMethods } from '../../utils/api';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  min-height: 100px;
`;

const Error = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Must be positive'),
  type: Yup.string().required('Required'),
  location: Yup.object({
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required')
  }),
  features: Yup.object({
    bedrooms: Yup.number().min(0),
    bathrooms: Yup.number().min(0),
    area: Yup.number().positive('Must be positive')
  })
});

function PropertyForm({ initialValues, mode = 'create' }) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      
      images.forEach(image => {
        formData.append('images', image);
      });

      if (mode === 'create') {
        await apiMethods.createProperty(formData);
      } else {
        await apiMethods.updateProperty(initialValues._id, formData);
      }

      navigate('/properties');
    } catch (error) {
      console.error('Property submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <h2>{mode === 'create' ? 'Add New Property' : 'Edit Property'}</h2>
      <Formik
        initialValues={initialValues || {
          title: '',
          description: '',
          price: '',
          type: '',
          location: { address: '', city: '', state: '' },
          features: { bedrooms: 0, bathrooms: 0, area: 0 }
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Form fields implementation */}
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default PropertyForm; 