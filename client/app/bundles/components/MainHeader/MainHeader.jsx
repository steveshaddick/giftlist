import React, { useContext } from 'react';
import { store } from 'utilities/store.js';

import * as styled from './_styles';

const MainHeader = () => {
  const globalState = useContext(store);
  const { currentUser } = globalState.state;

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
            <styled.ProfileLink href={`/users/${currentUser.id}/profile`}>
              My Lists
            </styled.ProfileLink>
          </li>
        </styled.HeaderBannerList>
      </styled.HeaderBanner>
    </header>
  );
};

export default MainHeader;
