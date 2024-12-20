import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background.light};
  margin: 0 auto 2rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
});

function UserProfile() {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useNotification();
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (avatar) {
        formData.append('avatar', avatar);
      }

      await updateProfile(formData);
      addNotification('Profile updated successfully', 'success');
    } catch (error) {
      addNotification('Failed to update profile', 'error');
    }
  };

  return (
    <ProfileContainer>
      <Avatar>
        <img src={user.avatar || '/default-avatar.png'} alt={user.name} />
      </Avatar>

      <Formik
        initialValues={{
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <label>Name</label>
              <Input name="name" type="text" />
            </FormGroup>

            <FormGroup>
              <label>Email</label>
              <Input name="email" type="email" />
            </FormGroup>

            <FormGroup>
              <label>Phone</label>
              <Input name="phone" type="tel" />
            </FormGroup>

            <FormGroup>
              <label>Profile Picture</label>
              <Input
                type="file"
                accept="image/*"
                onChange={e => setAvatar(e.target.files[0])}
              />
            </FormGroup>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </Button>
          </Form>
        )}
      </Formik>
    </ProfileContainer>
  );
}

export default UserProfile; 