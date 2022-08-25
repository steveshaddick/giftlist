import styled from 'styled-components';
import { breakpoints } from 'common/_styles/breakpoints';

export const SummaryRow = styled.div`
  @media ${breakpoints.tabletPortraitAndUp} {
    display: flex;
    justify-content: space-between;
  }
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

export const GroupOwnedInfo = styled.p`
  font-style: italic;
  color: #999;
`;

export const TitleContainer = styled.div`
  width: 75%;
  min-width: 200px;
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

export const EditButtonContainer = styled.div`
  align-self: flex-end;

  button {
    margin: 0 0.5rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const ActionRow = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
`;

export const ActionButton = styled.button``;

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
  padding: 1rem 0;

  ${(props) => {
    if (props.isClaimed) {
      if (props.currentUserClaimed) {
        return `
          background: #eaf0ec;
          padding: 1rem;
          color: #12620f;
          border: none;
        `;
      }
      return `
          opacity: 0.5;
        `;
    }
    if (props.isGroupOwned) {
      return `
        background-color: #fffbf9;
      `;
    }
    return ``;
  }}
`;
