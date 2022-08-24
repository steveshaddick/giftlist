import styled from 'styled-components';

export const Component = styled.div``;

export const TextContainer = styled.div`
  .gift-title {
    font-weight: bold;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
`;

export const Button = styled.button`
  display: inline-block;
  width: 100px;
  border-radius: 5px;
  border: 2px solid #333;
  padding: 0.5rem;
  background: none;
  cursor: pointer;
`;

export const ConfirmButton = styled(Button)`
  border-color: #6d886d;
  background: #e3f4e3;
  font-weight: bold;
  color: #6d886d;

  &:hover,
  &:active {
    background: #6d886d;
    color: white;
  }
`;

export const CancelButton = styled(Button)`
  border-color: #ccc;
  color: #999;

  &:hover,
  &:active {
    background: #ccc;
    color: black;
  }
`;
