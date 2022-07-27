import styled from 'styled-components';

export const Component = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  position: sticky;
  top: 0;
  background: white;
`;

export const TabButton = styled.button`
  flex: 50% 1 1;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: bold;

  ${props => {
    if (props.selected) {
      return `
        background: #ccc;
      `;
    }
  }}

  &:hover {
    background: #eee;
  }
`;