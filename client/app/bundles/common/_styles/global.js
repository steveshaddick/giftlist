import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    
    scroll-padding-top: 50px;
    overflow: auto;
  }

  body {
    --standard-font: 'Assistant', sans-serif;

    --error-red: #d04949;
    --green: #569340;
    --dark-green: #4a6c32;
    --yellow: #e8de55;

    background-color: white;
    font-family: var(--standard-font);
    color: #333;
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

    &:not([disabled]) {
      &:hover, &:active {
        background: #aaa;
        color: white;
      }
    }

    &:disabled {
      border: 2px solid #aaa;
      cursor: inherit;
      opacity: 0.5;
      background: #eee;
      color: #454545;
    }
  }
`;
