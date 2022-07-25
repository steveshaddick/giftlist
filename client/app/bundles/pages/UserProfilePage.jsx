import React, { useState, useEffect } from 'react';
import { StateProvider } from 'utilities/store.js';
import { getClaimList as apiGetClaimList } from 'utilities/api';

import MainHeader from 'components/MainHeader/MainHeader';
import MainFooter from 'components/MainFooter/MainFooter';
import ProfileDetails from 'components/ProfileDetails/ProfileDetails';
import ProfileTabs from 'components/ProfileTabs/ProfileTabs';
import ClaimList from 'components/ClaimList/ClaimList';

import * as styled from './_styles';

const UserProfilePage = (props) => {
  const { currentUser } = props;
  const { name } = currentUser;

  const [selectedTab, setSelectedTab] = useState('claimed');
  const [items, setItems] = useState([]);

  const tabClickHandler = (e) => {
    const tab = e.currentTarget.dataset.action;
    setSelectedTab(tab);
  }

  useEffect(() => {
    apiGetClaimList({
      currentUser,
    })
      .then(response => {
        setItems(response);
      });
  }, [selectedTab]);

  return (
    <>
      <styled.GlobalStyle />
      <StateProvider currentUser={currentUser} >
        <MainHeader />
        <styled.PageContainer id="UserProfilePage">
          <ProfileDetails name={ name } />
          <ProfileTabs selectedTab={ selectedTab } tabClickHandler={ tabClickHandler } />
          { selectedTab == 'claimed' &&
            <ClaimList items={ items } />
          }
        </styled.PageContainer>
        <MainFooter />
      </StateProvider>
    </>
  );
};

export default UserProfilePage;
