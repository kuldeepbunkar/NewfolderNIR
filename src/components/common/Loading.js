import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.fullScreen ? '100vh' : '200px'};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${props => props.theme.colors.background.main};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${props => props.theme.colors.text.secondary};
`;

function Loading({ fullScreen = false, text = 'Loading...' }) {
  return (
    <LoadingContainer fullScreen={fullScreen}>
      <div>
        <Spinner />
        <LoadingText>{text}</LoadingText>
      </div>
    </LoadingContainer>
  );
}

export default Loading; 