import styled from 'styled-components';

export const HeaderBanner = styled.div`
  width: 100%;
  background: #F4F1E9;
  padding: 20px 30px;
`;

export const MainLogoLink = styled.a`
  font-size: 2rem;
  font-weight: bold;
`;

export const HeaderBannerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: baseline;

  li {
    flex-basis: calc(100% / 3);
  }
`;