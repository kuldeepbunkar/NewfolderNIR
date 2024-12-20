import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { apiMethods } from '../../utils/api';

const Container = styled.div`
  padding: 2rem;
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ReportCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ReportsPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await apiMethods.getReports();
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Analytics & Reports</h2>

      <ReportGrid>
        <ReportCard>
          <h3>Property Views</h3>
          <LineChart width={500} height={300} data={data.propertyViews}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
          </LineChart>
        </ReportCard>

        <ReportCard>
          <h3>Property Types Distribution</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={data.propertyTypes}
              cx={250}
              cy={150}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.propertyTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ReportCard>

        <ReportCard>
          <h3>Monthly Revenue</h3>
          <BarChart width={500} height={300} data={data.revenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ReportCard>
      </ReportGrid>
    </Container>
  );
}

export default ReportsPanel; 