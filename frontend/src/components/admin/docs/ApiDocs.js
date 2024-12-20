import React from 'react';
import styled from 'styled-components';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Container = styled.div`
  padding: 2rem;
`;

const DocsContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;

  .swagger-ui {
    .info {
      padding: 1.5rem;
    }
  }
`;

function ApiDocs() {
  return (
    <Container>
      <h2>API Documentation</h2>
      <DocsContainer>
        <SwaggerUI url="/api/docs/swagger.json" />
      </DocsContainer>
    </Container>
  );
}

export default ApiDocs; 