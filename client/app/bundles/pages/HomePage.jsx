import React from 'react';
import { StateProvider } from 'utilities/store.js';

import MainHeader from 'components/MainHeader/MainHeader';
import MainFooter from 'components/MainFooter/MainFooter';
import GiftGroup from 'components/GiftGroup/GiftGroup';

import * as styled from './_styles';

const HomePage = (props) => {
  const { currentUser, giftGroups } = props;

  return (
    <>
      <styled.GlobalStyle />
      <StateProvider currentUser={currentUser} >
        <MainHeader />
        <styled.PageContainer id="HomePage">
          {giftGroups.map((group) => {
            return <GiftGroup currentUser={ currentUser } data={ group } />
          })}
        </styled.PageContainer>
        <MainFooter />
      </StateProvider>
    </>
  );
};

export default HomePage;
