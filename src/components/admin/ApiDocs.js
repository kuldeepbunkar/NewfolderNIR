import React from 'react';
import styled from 'styled-components';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Container = styled.div`
  padding: 2rem;
`;

function ApiDocs() {
  return (
    <Container>
      <h2>API Documentation</h2>
      <SwaggerUI url="/api/docs/swagger.json" />
    </Container>
  );
}

export default ApiDocs; 