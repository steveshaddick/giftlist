import React from 'react';

import * as styled from './_styles';

const MainHeader = () => {

  return (
    <header>
      <styled.HeaderBanner>
        <styled.HeaderBannerList>
          <li>
            <styled.MainLogoLink href="/">
              <h1>Gift Lists</h1>
            </styled.MainLogoLink>
          </li>

          <li>
            <styled.AccountLink href="/account">
              My Account
            </styled.AccountLink>
          </li>
        </styled.HeaderBannerList>
      </styled.HeaderBanner>
    </header>
  );
};

export default MainHeader;
