import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background: ${props => props.theme.colors.background.light};
  border-radius: 8px;
  margin: 2rem;

  h1 {
    color: ${props => props.theme.colors.error};
    margin-bottom: 1rem;
  }

  .icon {
    font-size: 4rem;
    color: ${props => props.theme.colors.error};
    margin-bottom: 1rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <div className="icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h1>Something went wrong</h1>
          <p>We're sorry, but something went wrong. Please try again later.</p>
          <button onClick={this.handleReset}>
            Reload Page
          </button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 