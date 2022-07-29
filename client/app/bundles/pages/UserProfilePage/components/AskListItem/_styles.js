import styled from 'styled-components';

export const SummaryRow = styled.div`
  display: flex;
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-size: 1.25rem;
  margin-top: 0;
  font-family: var(--standard-font);
  margin-bottom: 0.25rem;
`;

export const Description = styled.div`
  margin: 1rem 0 1rem 0.5rem;
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

export const ActionButton = styled.button`
  background: none;
  cursor: pointer;
  color: #999;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 1rem;

  &:hover, &:active {
    background: #aaa;
    color: white;
  }
`;

export const DeleteButton = styled(ActionButton)`
  color: red;
  border-color: red;
`;

export const EditButton = styled(ActionButton)`
  color: blue;
  border-color: blue;
`;

export const ClaimedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${ActionButton} {
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
  padding-bottom: 1rem;

  background: ${props => props.isEditing ? "#fffbf1" : 'transparent'}
`;
