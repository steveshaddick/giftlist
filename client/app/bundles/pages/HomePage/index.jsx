import React from 'react';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader/';
import MainFooter from 'pages/common/MainFooter';

import GiftGroup from './components/GiftGroup';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';

const HomePage = (props) => {
  const { currentUser, giftGroups } = props;

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser} >
        <MainHeader />
        <layout.PageContainer id="HomePage">
          {giftGroups.map((group, index) => {
            return <GiftGroup key={ index } currentUser={ currentUser } data={ group } />
          })}
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

export default HomePage;
