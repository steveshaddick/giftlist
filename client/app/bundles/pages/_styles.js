import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
    font-family: 'Assistant', sans-serif;
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

    &:hover, &:active {
      background: #aaa;
      color: white;
    }

    &:disabled {
      cursor: none;
    }
  }
`;

export const PageContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`;

export const OpinionsSection = styled.section`
`;
