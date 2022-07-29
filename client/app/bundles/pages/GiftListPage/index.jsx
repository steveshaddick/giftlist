import React from 'react';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader';
import MainFooter from 'pages/common/MainFooter';
import GiftList from './components/GiftList';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';

const GiftListPage = (props) => {
  const { currentUser, user, gifts } = props;
  const { name } = user;

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser} >
        <MainHeader />
        <layout.PageContainer id="GiftListPage">
          <GiftList name={ name } items={ gifts } />
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

export default GiftListPage;
