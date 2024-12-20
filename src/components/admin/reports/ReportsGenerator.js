import React, { useState } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  padding: 2rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ReportCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: 1rem;
`;

function ReportsGenerator() {
  const [filters, setFilters] = useState({
    startDate: new Date(),
    endDate: new Date(),
    type: 'all',
    format: 'pdf'
  });

  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const response = await apiMethods.generateReport(filters);
      // Handle report download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${filters.type}-${new Date().toISOString()}.${filters.format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Container>
      <h2>Reports Generator</h2>
      <FiltersContainer>
        <div>
          <label>Start Date</label>
          <DatePicker
            selected={filters.startDate}
            onChange={date => setFilters({...filters, startDate: date})}
          />
        </div>
        {/* More filters */}
      </FiltersContainer>
      <button 
        onClick={handleGenerateReport}
        disabled={generating}
      >
        {generating ? 'Generating...' : 'Generate Report'}
      </button>
    </Container>
  );
}

export default ReportsGenerator; 