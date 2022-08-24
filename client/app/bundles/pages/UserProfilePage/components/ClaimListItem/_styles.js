import styled from 'styled-components';

export const SummaryRow = styled.div`
  display: flex;
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

  svg {
    display: block;
  }
`;

export const TitleContainer = styled.div`
  flex-grow: 1;
  min-width: 200px;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  cursor: pointer;
  margin-top: 0;
  font-family: var(--standard-font);
  margin-bottom: 0.25rem;

  &:hover,
  &:active {
    text-decoration: underline;
  }
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

export const ActionRow = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
`;

export const UnclaimButton = styled.button`
  color: var(--error-red);
  border-color: #ddbfbf;
  padding: 0.3rem 1.5rem;

  &:hover,
  &:active {
    background: #b74a4a;
  }
`;

export const ClaimedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Component = styled.article`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;

  ${(props) => {
    if (props.isGot) {
      return `
        ${Title} {
          color: #999;
          text-decoration: line-through;
        }
        ${PriceContainer} {
          display: none;
        }
      `;
    }
    return ``;
  }};
`;
