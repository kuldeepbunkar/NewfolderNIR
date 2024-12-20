import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../utils/api';

const Container = styled.div`
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;

  h3 {
    color: ${props => props.theme.colors.text.secondary};
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
  }

  .change {
    font-size: 0.875rem;
    color: ${props => props.increase ? props.theme.colors.success : props.theme.colors.error};
  }
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: 2rem;
`;

function AnalyticsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await apiMethods.getAnalytics();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Analytics Dashboard</h2>

      <StatsGrid>
        <StatCard>
          <h3>Total Users</h3>
          <div className="value">{stats.totalUsers}</div>
          <div className="change" increase={stats.userGrowth > 0}>
            {stats.userGrowth > 0 ? '+' : ''}{stats.userGrowth}%
          </div>
        </StatCard>

        <StatCard>
          <h3>Active Properties</h3>
          <div className="value">{stats.activeProperties}</div>
          <div className="change" increase={stats.propertyGrowth > 0}>
            {stats.propertyGrowth > 0 ? '+' : ''}{stats.propertyGrowth}%
          </div>
        </StatCard>

        <StatCard>
          <h3>Monthly Revenue</h3>
          <div className="value">₹{stats.monthlyRevenue}</div>
          <div className="change" increase={stats.revenueGrowth > 0}>
            {stats.revenueGrowth > 0 ? '+' : ''}{stats.revenueGrowth}%
          </div>
        </StatCard>

        <StatCard>
          <h3>Total Leads</h3>
          <div className="value">{stats.totalLeads}</div>
          <div className="change" increase={stats.leadGrowth > 0}>
            {stats.leadGrowth > 0 ? '+' : ''}{stats.leadGrowth}%
          </div>
        </StatCard>
      </StatsGrid>

      {/* Add more charts and analytics here */}
    </Container>
  );
}

export default AnalyticsDashboard; 