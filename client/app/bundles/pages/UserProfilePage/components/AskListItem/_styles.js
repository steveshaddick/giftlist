import styled from 'styled-components';
import { breakpoints } from 'common/_styles/breakpoints';

export const SummaryRow = styled.div`
  @media ${breakpoints.tabletPortraitAndUp} {
    display: flex;
    justify-content: space-between;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

export const CheckboxContainer = styled.div`
  padding-right: 25px;
`;

export const CheckboxButton = styled.button`
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  margin: 0;
`;

export const TitleContainer = styled.div`
  flex-grow: 1;
  min-width: 200px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-top: 0;
  font-family: var(--standard-font);
  margin-bottom: 0.25rem;
`;

export const Description = styled.div`
  margin: 1rem 0;
  font-size: 1.15rem;
`;

export const PriceContainer = styled.div`
  color: #aaa;
  font-size: 1.25rem;
`;

export const Price = styled.span`
  color: #666;

  &::before {
    content: '$';
    color: #aaa;
    font-size: 0.85rem;
  }
`;

export const DeleteButton = styled.button`
  color: var(--error-red);
  border-color: #ddbfbf;
  padding: 0.3rem 1.5rem;

  &:hover,
  &:active {
    background: #b74a4a;
  }
`;

export const EditButton = styled.button`
  color: var(--blue);
  border-color: #c8d6e1;
  padding: 0.3rem 1.5rem;

  &:hover,
  &:active {
    background: #5d859d;
  }
`;

export const ClaimedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  button {
    color: #9b4343;

    &:hover {
      border: 1px solid #9b4343;
      background: #9b4343;
      color: #fff;
    }
  }
`;

export const Component = styled.article`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 1.5rem 0;

  background: ${(props) => (props.isEditing ? '#f6f6f6' : 'transparent')};
`;
