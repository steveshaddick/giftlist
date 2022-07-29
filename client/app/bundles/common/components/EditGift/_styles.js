import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubmitButton = styled.button`
    background: var(--green);
    cursor: pointer;
    color: white;
    border: 2px solid var(--green);
    border-radius: 5px;
    padding: 0.5rem;
    width: 100%;

    &:not([disabled]) {
      &:hover, &:active {
        background: var(--dark-green);
        color: white;
      }
    }

    &:disabled {
      cursor: inherit;
      opacity: 0.5;
      background: #eee;
    }
`;

export const SavingButton = styled(SubmitButton)`
  &:disabled {
    background: var(--yellow);
  }

  i {
    vertical-align: middle;
    display: inline-block;
    margin-right: 0.5rem;

    svg {
      animation: ${rotate} 2s linear infinite;
    }
  }
`;

export const Error = styled.span`
  font-weight: bold;
  display: block;
  color: var(--error-red);
  margin: 0.5rem 0;
`;

export const Label = styled.label`
  display: block;
  color: #999;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const PriceInput = styled(Input)`
  max-width: 7.5rem;
`;

export const PriceInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 275px;
`;

export const PriceRangeContainer = styled.div`
  margin: 0.75rem 0;

  input {
    height: 1.25rem;
    width: 1.25rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  label {
    display: inline-block;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FieldContainer = styled.div`
  margin: 1.5rem 0;
`;

export const EditGiftForm = styled.form`
`;

export const Title = styled.h1`
  font-size: 1.5rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Component = styled.section`
  width: 100%;
  background: #f6f6f6;

  .quill {
    background: white;
  }

  .ql-container {
    font-family: var(--standard-font);
    font-size: 1rem;
  }

  .ql-editor {
    height: 10rem;
  }
`;
