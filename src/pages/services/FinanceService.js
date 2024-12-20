import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoanCalculator = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CalculatorForm = styled.form`
  display: grid;
  gap: 1rem;

  label {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }
`;

const Result = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  text-align: center;

  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .amount {
    font-size: 2rem;
    color: #3498db;
    font-weight: bold;
  }
`;

const DocumentsList = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      color: #666;

      &:before {
        content: "✓";
        color: #3498db;
        margin-right: 1rem;
      }
    }
  }
`;

const ApplyButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #2980b9;
  }
`;

function FinanceService() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const ratePerMonth = parseFloat(interestRate) / (12 * 100);
    const tenureMonths = parseFloat(tenure) * 12;
    
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths) / 
                (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
    
    setEmi(emi.toFixed(2));
  };

  return (
    <Container>
      <Header>
        <Title>Financial Services</Title>
        <Description>
          Get easy loan solutions with competitive interest rates. We help you achieve 
          your property goals with quick processing and minimal documentation.
        </Description>
      </Header>

      <ContentGrid>
        <LoanCalculator>
          <h2>EMI Calculator</h2>
          <CalculatorForm onSubmit={calculateEMI}>
            <div>
              <label>Loan Amount (₹)</label>
              <input 
                type="number" 
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Interest Rate (%)</label>
              <input 
                type="number" 
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Loan Tenure (Years)</label>
              <input 
                type="number" 
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                required
              />
            </div>
            <ApplyButton type="submit">Calculate EMI</ApplyButton>
          </CalculatorForm>
          
          {emi && (
            <Result>
              <h3>Your Monthly EMI</h3>
              <div className="amount">₹{emi}</div>
            </Result>
          )}
        </LoanCalculator>

        <DocumentsList>
          <h2>Required Documents</h2>
          <ul>
            <li>Valid ID Proof (Aadhar Card/PAN Card)</li>
            <li>Address Proof</li>
            <li>Income Proof (Last 6 months salary slips)</li>
            <li>Bank Statements (Last 6 months)</li>
            <li>Property Documents</li>
            <li>Passport Size Photographs</li>
            <li>Employment Details</li>
          </ul>
          <ApplyButton>Apply for Loan</ApplyButton>
        </DocumentsList>
      </ContentGrid>
    </Container>
  );
}

export default FinanceService; 