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
`;

export const PageContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 20px 30px;
    margin: 0 auto;
`;

export const OpinionsSection = styled.section`
`;
