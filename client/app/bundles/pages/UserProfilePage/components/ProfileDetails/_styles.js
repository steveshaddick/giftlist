import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Component = styled.div`
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
`;

export const BackToGroupLink = styled.a`
  font-size: 2rem;
  padding: 0px 10px 5px;
  position: absolute;
  left: 20px;
  top: -10px;
  border: 3px solid #b9ae94;
  border-radius: 50px;
  color: #b9ae94;
  text-decoration: none;

  &::before {
    content: '\\21E6';
  }

  &:hover,
  &:active {
    background: #eceae1;
  }
`;
