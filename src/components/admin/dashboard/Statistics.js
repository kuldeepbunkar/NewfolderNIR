import React from 'react';
import styled from 'styled-components';
import { useStats } from '../../../hooks/useStats';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
  }

  .content {
    text-align: right;
  }

  .value {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .label {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

function Statistics() {
  const { stats, loading } = useStats();

  if (loading) return <div>Loading stats...</div>;

  return (
    <StatsGrid>
      <StatCard>
        <i className="fas fa-users icon"></i>
        <div className="content">
          <div className="value">{stats.totalUsers}</div>
          <div className="label">Total Users</div>
        </div>
      </StatCard>

      <StatCard>
        <i className="fas fa-building icon"></i>
        <div className="content">
          <div className="value">{stats.activeProperties}</div>
          <div className="label">Active Properties</div>
        </div>
      </StatCard>

      <StatCard>
        <i className="fas fa-rupee-sign icon"></i>
        <div className="content">
          <div className="value">₹{stats.monthlyRevenue}</div>
          <div className="label">Monthly Revenue</div>
        </div>
      </StatCard>

      <StatCard>
        <i className="fas fa-chart-line icon"></i>
        <div className="content">
          <div className="value">{stats.conversionRate}%</div>
          <div className="label">Conversion Rate</div>
        </div>
      </StatCard>
    </StatsGrid>
  );
}

export default Statistics; 