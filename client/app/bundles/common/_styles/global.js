import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    
    scroll-padding-top: 50px;
    overflow: auto;
  }

  body {
    --standard-font: 'Assistant', sans-serif;
    --font-color: #333;

    --error-red: #d04949;
    --green: #569340;
    --dark-green: #4a6c32;
    --yellow: #e8de55;
    --blue: #22639b;

    background-color: white;
    font-family: var(--standard-font);
    color: var(--font-color);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Arvo', serif;
    font-weight: 600;
  }

  button {
    background: none;
    cursor: pointer;
    color: #454545;
    border: 2px solid #aaa;
    border-radius: 5px;
    padding: 0.5rem 1rem;

    &:hover, &:active {
      background: #aaa;
      color: white;
    }

    &:disabled {
      border: 2px solid #aaa;
      cursor: inherit;
      opacity: 0.5;
      background: #eee;
      color: #454545;

      &:hover, &:active {
        background: #eee;
        color: #454545;
      }
    }
  }
`;
