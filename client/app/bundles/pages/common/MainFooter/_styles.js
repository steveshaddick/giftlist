import styled from 'styled-components';

export const FooterNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

export const FooterNav = styled.nav`
  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
`;

export const FooterBlock = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 20px 30px;
  margin: 2rem auto 0;
  border-top: 2px solid #b1aca3;
`;
