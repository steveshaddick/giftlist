import styled from 'styled-components';

export const EmptyList = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

export const AddButton = styled.button``;

export const AskerNameContainer = styled.div`
  background: #f6f6f6;
  padding: 0.15rem 0;
  margin-top: 2rem;
`;

export const AskerName = styled.h2`
  font-size: 1rem;
  font-weight: normal;

  a {
    color: inherit;
    text-decoration-color: #999;

    &:hover,
    &:active {
      color: #999;
    }
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 30px;
`;

export const ListItem = styled.li`
  margin-bottom: 1rem;
`;

export const Heading = styled.h1`
  margin: 0;
  color: #999;
  font-size: 1.25rem;
  font-weight: 400;
  border-bottom: 2px solid #ddd;
  padding: 10px 0;
  position: sticky;
  top: 0;
  background: white;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: -32px;
    background-image: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
`;

export const TopContainer = styled.div`
  padding: 2rem 0;
`;

export const BottomContainer = styled.div`
  padding: 2rem 0;
`;

export const Component = styled.div`
  width: 100%;
`;
