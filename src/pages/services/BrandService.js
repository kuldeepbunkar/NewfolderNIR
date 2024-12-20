import React from 'react';
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

const PlansSection = styled.div`
  margin: 4rem 0;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s;

  ${props => props.featured && `
    border: 2px solid #3498db;
    transform: scale(1.05);
  `}

  &:hover {
    transform: ${props => props.featured ? 'scale(1.08)' : 'scale(1.03)'};
  }
`;

const PlanName = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  font-size: 2.5rem;
  color: #3498db;
  margin: 1.5rem 0;
  
  span {
    font-size: 1rem;
    color: #666;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: left;

  li {
    padding: 0.5rem 0;
    color: #666;
    display: flex;
    align-items: center;

    &:before {
      content: "✓";
      color: #3498db;
      margin-right: 0.5rem;
    }
  }
`;

const ChoosePlanButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${props => props.featured ? '#3498db' : '#fff'};
  color: ${props => props.featured ? '#fff' : '#3498db'};
  border: 2px solid #3498db;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #3498db;
    color: white;
  }
`;

const ServicesSection = styled.div`
  margin: 4rem 0;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    color: #2c3e50;
    margin: 1rem 0;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

function BrandService() {
  const plans = [
    {
      name: "Starter",
      price: 4999,
      period: "month",
      features: [
        "Social Media Management",
        "Basic SEO Optimization",
        "2 Blog Posts per Month",
        "Monthly Performance Report",
        "Email Support"
      ]
    },
    {
      name: "Professional",
      price: 9999,
      period: "month",
      featured: true,
      features: [
        "Advanced Social Media Management",
        "Complete SEO Optimization",
        "4 Blog Posts per Month",
        "Weekly Performance Reports",
        "Priority Support",
        "Google Ads Management",
        "Content Marketing Strategy"
      ]
    },
    {
      name: "Enterprise",
      price: 19999,
      period: "month",
      features: [
        "Premium Social Media Management",
        "Advanced SEO & SEM",
        "8 Blog Posts per Month",
        "Daily Performance Reports",
        "24/7 Support",
        "Custom Marketing Strategy",
        "Video Marketing",
        "Email Marketing Campaigns"
      ]
    }
  ];

  const services = [
    {
      icon: "📱",
      title: "Social Media Marketing",
      description: "Engage with your audience across all major social media platforms."
    },
    {
      icon: "🎯",
      title: "Targeted Advertising",
      description: "Reach your ideal customers with precision-targeted ad campaigns."
    },
    {
      icon: "📊",
      title: "Analytics & Reporting",
      description: "Track your brand's growth with detailed analytics and insights."
    },
    {
      icon: "✍️",
      title: "Content Creation",
      description: "Professional content that resonates with your target audience."
    }
  ];

  return (
    <Container>
      <Header>
        <Title>Brand Promotion Services</Title>
        <Description>
          Boost your real estate brand's visibility and reach with our comprehensive 
          digital marketing solutions. We help you connect with your target audience 
          and grow your business.
        </Description>
      </Header>

      <ServicesSection>
        <h2>Our Marketing Solutions</h2>
        <ServiceGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <div style={{ fontSize: '3rem' }}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </ServicesSection>

      <PlansSection>
        <h2>Choose Your Plan</h2>
        <PlansGrid>
          {plans.map((plan, index) => (
            <PlanCard key={index} featured={plan.featured}>
              <PlanName>{plan.name}</PlanName>
              <PlanPrice>
                ₹{plan.price}<span>/{plan.period}</span>
              </PlanPrice>
              <FeaturesList>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </FeaturesList>
              <ChoosePlanButton featured={plan.featured}>
                Choose {plan.name}
              </ChoosePlanButton>
            </PlanCard>
          ))}
        </PlansGrid>
      </PlansSection>
    </Container>
  );
}

export default BrandService; 