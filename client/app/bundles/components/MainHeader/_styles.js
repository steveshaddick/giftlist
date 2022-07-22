import styled from 'styled-components';

export const HeaderBanner = styled.div`
  width: 100%;
  background: #F2F1EF;
  padding: 20px 30px;
`;

export const HeaderBannerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: baseline;

  li {
    flex-basis: calc(100% / 2);

    &:last-of-type {
      text-align: right;
    }
  }
`;

export const MainLogoLink = styled.a`
  font-weight: bold;
  color: #616657;
  text-decoration: none;

  &:hover, &:active {
    text-decoration: underline;
    color: #222;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const ProfileLink = styled.a`
  font-size: 1rem;
  color: #333;
  text-decoration: none;

  &:hover, &:active {
    text-decoration: underline;
    color: #222;
  }
`;