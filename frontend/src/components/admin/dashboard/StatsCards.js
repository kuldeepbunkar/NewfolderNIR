import React from 'react';
import styled from 'styled-components';
import { useStats } from '../../../hooks/useStats';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${props => props.theme.colors.background.light};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .label {
    color: ${props => props.theme.colors.text.secondary};
  }

  .change {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: ${props => props.increase ? props.theme.colors.success : props.theme.colors.error};
  }
`;

function StatsCards() {
  const { stats, loading } = useStats();

  if (loading) return <div>Loading stats...</div>;

  return (
    <StatsGrid>
      <StatCard>
        <div className="icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="value">{stats.totalUsers}</div>
        <div className="label">Total Users</div>
        <div className="change" increase={stats.userGrowth > 0}>
          <i className={`fas fa-arrow-${stats.userGrowth > 0 ? 'up' : 'down'}`}></i>
          {Math.abs(stats.userGrowth)}%
        </div>
      </StatCard>

      <StatCard>
        <div className="icon">
          <i className="fas fa-building"></i>
        </div>
        <div className="value">{stats.activeProperties}</div>
        <div className="label">Active Properties</div>
        <div className="change" increase={stats.propertyGrowth > 0}>
          <i className={`fas fa-arrow-${stats.propertyGrowth > 0 ? 'up' : 'down'}`}></i>
          {Math.abs(stats.propertyGrowth)}%
        </div>
      </StatCard>

      <StatCard>
        <div className="icon">
          <i className="fas fa-rupee-sign"></i>
        </div>
        <div className="value">₹{stats.revenue.toLocaleString()}</div>
        <div className="label">Monthly Revenue</div>
        <div className="change" increase={stats.revenueGrowth > 0}>
          <i className={`fas fa-arrow-${stats.revenueGrowth > 0 ? 'up' : 'down'}`}></i>
          {Math.abs(stats.revenueGrowth)}%
        </div>
      </StatCard>

      <StatCard>
        <div className="icon">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="value">{stats.conversionRate}%</div>
        <div className="label">Conversion Rate</div>
        <div className="change" increase={stats.conversionGrowth > 0}>
          <i className={`fas fa-arrow-${stats.conversionGrowth > 0 ? 'up' : 'down'}`}></i>
          {Math.abs(stats.conversionGrowth)}%
        </div>
      </StatCard>
    </StatsGrid>
  );
}

export default StatsCards; 