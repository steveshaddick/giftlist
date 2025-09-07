import styled from 'styled-components';

export const MyListsSection = styled.section`
  width: 100%;
  padding: 20px;
  border-bottom: 2px solid #b1aca3;
`;

export const MyListsLink = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  border: 1px solid #c4aa21;
  padding: 10px;
  display: block;
  border-radius: 10px;
  background: #fbf6de;

  &:hover,
  &:active {
    background: #eceae1;
  }
`;
