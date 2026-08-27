import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Component = styled.div`
  width: 100%;
  font-size: 1.5rem;
  text-align: center;

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
  }

  dl {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem 2rem;
    text-align: left;
  }

  dt {
    font-weight: 600;
    color: #616657;
  }

  dd {
    margin: 0;
    color: #333;
  }
`;
