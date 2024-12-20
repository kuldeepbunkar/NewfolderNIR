import React from 'react';
import styled from 'styled-components';
import Statistics from './Statistics';
import Charts from './Charts';
import RecentActivity from './RecentActivity';

const Container = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

function Overview() {
  return (
    <Container>
      <h1>Dashboard Overview</h1>
      <Statistics />
      <Charts />
      <RecentActivity />
    </Container>
  );
}

export default Overview; 