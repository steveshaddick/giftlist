import React from 'react';
import PropTypes from 'prop-types';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader';
import MainFooter from 'pages/common/MainFooter';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';
import GiftList from './components/GiftList';

export function sortGiftList(currentUser, list) {
  const currentClaimedGifts = [];
  const askingGifts = [];
  const groupGifts = [];
  const otherClaimedGifts = [];

  list.forEach((gift) => {
    const { claimer, groupOwner } = gift;
    if (claimer?.id === currentUser.id) {
      currentClaimedGifts.push(gift);
    } else if (claimer) {
      otherClaimedGifts.push(gift);
    } else if (groupOwner) {
      groupGifts.push(gift);
    } else {
      askingGifts.push(gift);
    }
  });

  return [].concat(currentClaimedGifts, askingGifts, groupGifts, otherClaimedGifts);
}

const GiftListPage = (props) => {
  const { currentUser, user, gifts } = props;
  const sortedGifts = sortGiftList(currentUser, gifts);

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser}>
        <MainHeader />
        <layout.PageContainer id="GiftListPage">
          <GiftList user={user} items={sortedGifts} />
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

GiftListPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  gifts: PropTypes.array.isRequired,
};

export default GiftListPage;
