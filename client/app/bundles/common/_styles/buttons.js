import styled from 'styled-components';

export const EditButton = styled.button`
  color: var(--blue);
  border-color: #c8d6e1;
  padding: 0.3rem 1.5rem;

  &:hover, &:active {
    background: #5d859d;
  }
`;

export const DeleteButton = styled.button`
  color: var(--error-red);
  border-color: #ddbfbf;
  padding: 0.3rem 1.5rem;

  &:hover, &:active {
    background: #b74a4a;
  }
`;
