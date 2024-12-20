import React, { useState } from 'react';
import styled from 'styled-components';
import { apiMethods } from '../../../utils/api';
import { useNotification } from '../../../hooks/useNotification';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Container = styled.div`
  padding: 2rem;
`;

const ReportCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

function ReportsGenerator() {
  const [reportConfig, setReportConfig] = useState({
    type: 'sales',
    startDate: new Date(),
    endDate: new Date(),
    format: 'pdf'
  });
  const [generating, setGenerating] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await apiMethods.generateReport(reportConfig);
      // Handle report download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${reportConfig.type}-${new Date().toISOString()}.${reportConfig.format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      addNotification('Report generated successfully', 'success');
    } catch (error) {
      addNotification('Failed to generate report', 'error');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Container>
      <h2>Reports Generator</h2>
      <ReportCard>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Report Type</label>
            <select
              value={reportConfig.type}
              onChange={e => setReportConfig({...reportConfig, type: e.target.value})}
            >
              <option value="sales">Sales Report</option>
              <option value="users">User Activity Report</option>
              <option value="properties">Property Report</option>
              <option value="analytics">Analytics Report</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Date Range</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <DatePicker
                selected={reportConfig.startDate}
                onChange={date => setReportConfig({...reportConfig, startDate: date})}
                selectsStart
                startDate={reportConfig.startDate}
                endDate={reportConfig.endDate}
              />
              <DatePicker
                selected={reportConfig.endDate}
                onChange={date => setReportConfig({...reportConfig, endDate: date})}
                selectsEnd
                startDate={reportConfig.startDate}
                endDate={reportConfig.endDate}
                minDate={reportConfig.startDate}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>Format</label>
            <select
              value={reportConfig.format}
              onChange={e => setReportConfig({...reportConfig, format: e.target.value})}
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </FormGroup>

          <Button type="submit" disabled={generating}>
            {generating ? 'Generating...' : 'Generate Report'}
          </Button>
        </Form>
      </ReportCard>
    </Container>
  );
}

export default ReportsGenerator; 