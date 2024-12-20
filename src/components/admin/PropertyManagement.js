import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNotification } from '../../context/NotificationContext';
import { apiMethods } from '../../utils/api';

const Container = styled.div`
  padding: 2rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PropertyInfo = styled.div`
  padding: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${props => {
    switch (props.status) {
      case 'pending': return props.theme.colors.warning;
      case 'approved': return props.theme.colors.success;
      case 'rejected': return props.theme.colors.error;
      default: return props.theme.colors.primary;
    }
  }};
  color: white;
`;

function PropertyManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    try {
      const response = await apiMethods.getProperties({ status: filter });
      setProperties(response.data);
    } catch (error) {
      addNotification('Failed to fetch properties', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await apiMethods.approveProperty(id);
      addNotification('Property approved successfully', 'success');
      fetchProperties();
    } catch (error) {
      addNotification('Failed to approve property', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      await apiMethods.rejectProperty(id);
      addNotification('Property rejected', 'success');
      fetchProperties();
    } catch (error) {
      addNotification('Failed to reject property', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Property Management</h2>
      
      <FilterBar>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Properties</option>
          <option value="pending">Pending Approval</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </FilterBar>

      <PropertyGrid>
        {properties.map(property => (
          <PropertyCard key={property._id}>
            <PropertyImage src={property.images[0]} alt={property.title} />
            <PropertyInfo>
              <h3>{property.title}</h3>
              <p>{property.location}</p>
              <StatusBadge status={property.status}>
                {property.status}
              </StatusBadge>
              
              {property.status === 'pending' && (
                <div>
                  <button onClick={() => handleApprove(property._id)}>
                    Approve
                  </button>
                  <button onClick={() => handleReject(property._id)}>
                    Reject
                  </button>
                </div>
              )}
            </PropertyInfo>
          </PropertyCard>
        ))}
      </PropertyGrid>
    </Container>
  );
}

export default PropertyManagement; 