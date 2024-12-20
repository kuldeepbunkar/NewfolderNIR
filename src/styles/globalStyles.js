import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.background.main};
    color: ${props => props.theme.colors.text.primary};
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    line-height: 1.2;
  }

  h1 {
    font-size: ${props => props.theme.typography.fontSize.h1};
  }

  h2 {
    font-size: ${props => props.theme.typography.fontSize.h2};
  }

  h3 {
    font-size: ${props => props.theme.typography.fontSize.h3};
  }

  h4 {
    font-size: ${props => props.theme.typography.fontSize.h4};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: ${props => props.theme.breakpoints.xl};
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    h1 {
      font-size: calc(${props => props.theme.typography.fontSize.h1} * 0.8);
    }
    h2 {
      font-size: calc(${props => props.theme.typography.fontSize.h2} * 0.8);
    }
    h3 {
      font-size: calc(${props => props.theme.typography.fontSize.h3} * 0.8);
    }
  }
`; 