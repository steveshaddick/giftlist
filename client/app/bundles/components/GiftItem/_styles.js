import styled from 'styled-components';

export const Component = styled.article`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;

  ${props => {
    if (props.isClaimed) {
      if (props.currentUserClaimed) {
        return `
          background: #d4eadc;
          padding: 1rem;
          border-radius: 10px;
          color: #12620f;
          border: none;
        `;
      } else {
        return `
          opacity: 0.5;
        `;
      }
    }
  }}
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
  font-size: 1.25rem;
  cursor: pointer;
  margin-top: 0;
  font-family: 'Assistant', sans-serif;

  &:hover, &:active {
    text-decoration: underline;
  }
`;

export const Description = styled.div`
  margin: 0 0 1rem 0.5rem;
  font-size: 1.15rem;
`;

export const PriceContainer = styled.div`
  text-align: center;
  flex-grow: 1;
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

  &:hover, &:active {
    background: #aaa;
    color: white;
  }
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
