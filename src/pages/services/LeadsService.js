import React from 'react';
import styled from 'styled-components';

const ServiceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ServiceHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  
  ${props => props.popular && `
    border: 2px solid #3498db;
    position: relative;
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #3498db;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
    }
  `}
`;

const PlanTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
  
  span {
    font-size: 1rem;
    color: #666;
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  
  li {
    color: #666;
    margin-bottom: 0.5rem;
    
    &::before {
      content: '✓';
      color: #3498db;
      margin-right: 0.5rem;
    }
  }
`;

const SubscribeButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background: #2980b9;
  }
`;

function LeadsService() {
  const plans = [
    {
      title: '1 Month Plan',
      price: 999,
      features: [
        '50 Verified Leads',
        'Lead Contact Details',
        'Basic Analytics',
        'Email Support'
      ]
    },
    {
      title: '3 Month Plan',
      price: 2499,
      popular: true,
      features: [
        '200 Verified Leads',
        'Lead Contact Details',
        'Advanced Analytics',
        'Priority Support',
        'Lead Quality Score'
      ]
    },
    {
      title: '6 Month Plan',
      price: 4999,
      features: [
        '500 Verified Leads',
        'Lead Contact Details',
        'Premium Analytics',
        '24/7 Support',
        'Lead Quality Score',
        'Custom Reports'
      ]
    }
  ];

  return (
    <ServiceContainer>
      <ServiceHeader>
        <Title>Property Leads Service</Title>
        <Description>
          Get high-quality property leads that convert. Our lead generation service helps you connect with genuine buyers and sellers in your target market.
        </Description>
      </ServiceHeader>
      
      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanCard key={index} popular={plan.popular}>
            <PlanTitle>{plan.title}</PlanTitle>
            <PlanPrice>
              ₹{plan.price}<span>/month</span>
            </PlanPrice>
            <PlanFeatures>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </PlanFeatures>
            <SubscribeButton>Subscribe Now</SubscribeButton>
          </PlanCard>
        ))}
      </PlansContainer>
    </ServiceContainer>
  );
}

export default LeadsService; 