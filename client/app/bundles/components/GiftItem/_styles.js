import styled from 'styled-components';

export const Component = styled.article`
  width: 100%;
`;

export const SummaryRow = styled.div`
  display: flex;
`;

export const ActionRow = styled.div`
  display: flex;
`;

export const Title = styled.h1`
  width: 75%;
  min-width: 200px;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 0;
`;

export const Description = styled.div`
  margin: 1rem 0;
`;

export const PriceContainer = styled.div`
  text-align: right;
  flex-grow: 1;
  color: #aaa;
`;

export const Price = styled.span`
  color: #666;

  &::before {
    content: '$';
    color: #aaa;
    font-size: 0.85rem;
  }
`;
