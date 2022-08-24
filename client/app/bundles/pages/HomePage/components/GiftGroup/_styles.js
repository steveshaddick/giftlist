import styled from 'styled-components';

export const Component = styled.section`
  width: 100%;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 0.5rem 0;
  }
`;

export const MemberListLink = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  border: 1px solid #c4aa21;
  padding: 10px;
  display: block;
  border-radius: 10px;

  &:hover,
  &:active {
    background: #eceae1;
  }
`;
