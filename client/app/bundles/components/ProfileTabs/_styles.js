import styled from 'styled-components';

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

export const TabsContainer = styled.nav`
  display: flex;
  border-bottom: 2px solid #ccc;
`;

export const ButtonsContainer = styled.div`
  padding: 1rem 0;
`;

export const NewGiftButton = styled.button`
`;

export const Component = styled.div`
  position: sticky;
  top: 0;
  background: white;
`;