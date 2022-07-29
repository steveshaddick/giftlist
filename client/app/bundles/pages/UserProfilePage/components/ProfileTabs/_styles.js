import styled from 'styled-components';

export const TabButton = styled.button`
  flex: 50% 1 1;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 0;

  &:hover, &:active {
    background: #eee;
    color: inherit;
  }

  ${props => {
    if (props.selected) {
      return `
        background: #e1e1e1;
        cursor: default;

        &:hover, &:active {
          background: #e1e1e1;
          color: var(--font-color);
        }
      `;
    }
  }}
`;

export const TabsContainer = styled.nav`
  display: flex;
  border-bottom: 2px solid #b9ae94;
`;

export const Component = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 10000;
`;