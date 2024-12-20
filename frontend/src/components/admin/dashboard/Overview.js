import React from 'react';
import styled from 'styled-components';
import StatsCards from './StatsCards';
import RecentActivities from './RecentActivities';
import AnalyticsCharts from './AnalyticsCharts';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
`;

function Overview() {
  return (
    <DashboardContainer>
      <h1>Dashboard Overview</h1>
      <Grid>
        <StatsCards />
        <AnalyticsCharts />
        <RecentActivities />
      </Grid>
    </DashboardContainer>
  );
}

export default Overview; 