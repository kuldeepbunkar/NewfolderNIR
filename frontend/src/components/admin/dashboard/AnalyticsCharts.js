import React from 'react';
import styled from 'styled-components';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { useAnalytics } from '../../../hooks/useAnalytics';

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  height: 400px;

  h3 {
    margin-bottom: 1rem;
  }
`;

function AnalyticsCharts() {
  const { data, loading } = useAnalytics();

  if (loading) return <div>Loading charts...</div>;

  return (
    <ChartsGrid>
      <ChartCard>
        <h3>Revenue Trends</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data.revenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard>
        <h3>Property Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data.propertyTypes}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </ChartsGrid>
  );
}

export default AnalyticsCharts; 