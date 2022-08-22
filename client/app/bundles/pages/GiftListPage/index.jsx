import React from 'react';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader';
import MainFooter from 'pages/common/MainFooter';
import GiftList from './components/GiftList';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';

const GiftListPage = (props) => {
  const { currentUser, user, gifts } = props;

  let currentClaimedGifts = [];
  let askingGifts = [];
  let groupGifts = [];
  let otherClaimedGifts = [];

  gifts.forEach((gift) => {
    const { claimer, groupOwner } = gift;
    if (claimer?.id == currentUser.id) {
      currentClaimedGifts.push(gift);
    } else if (claimer) {
      otherClaimedGifts.push(gift);
    } else if (groupOwner) {
      groupGifts.push(gift);
    } else {
      askingGifts.push(gift);
    }
  });

  const sortedGifts = [].concat(currentClaimedGifts, askingGifts, groupGifts, otherClaimedGifts);

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser} >
        <MainHeader />
        <layout.PageContainer id="GiftListPage">
          <GiftList user={ user } items={ sortedGifts } />
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

export default GiftListPage;
