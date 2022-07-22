import React from 'react';
import { StateProvider } from 'utilities/store.js';

import MainHeader from 'components/MainHeader/MainHeader';
import MainFooter from 'components/MainFooter/MainFooter';
import GiftList from 'components/GiftList/GiftList';

import * as styled from './_styles';

const GiftListPage = (props) => {
  const { currentAccount, gifts } = props;

  return (
    <>
      <styled.GlobalStyle />
      <StateProvider currentAccount={currentAccount} >
        <MainHeader />
        <styled.PageContainer id="GiftListPage">
          <GiftList items={ gifts } />
        </styled.PageContainer>
        <MainFooter />
      </StateProvider>
    </>
  );
};

export default GiftListPage;
