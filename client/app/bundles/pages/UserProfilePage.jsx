import React, { useState, useEffect, useRef } from 'react';
import { StateProvider } from 'utilities/store.js';
import { getClaimList as apiGetClaimList } from 'utilities/api';

import MainHeader from 'components/MainHeader/MainHeader';
import MainFooter from 'components/MainFooter/MainFooter';
import ProfileDetails from 'components/ProfileDetails/ProfileDetails';
import ProfileTabs from 'components/ProfileTabs/ProfileTabs';
import ClaimList from 'components/ClaimList/ClaimList';
import AskList from 'components/AskList/AskList';

import * as styled from './_styles';

const UserProfilePage = (props) => {
  const { currentUser, tab } = props;
  const { id, name } = currentUser;

  const [selectedTab, setSelectedTab] = useState('');
  let lastTab = useRef('');

  const tabClickHandler = (e) => {
    const tab = e.currentTarget.dataset.action;
    setSelectedTab(tab);
  }

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathTab = currentPath.replace(`/users/${id}/profile/`, '');

    window.addEventListener('popstate', () => {
      const currentPath = window.location.pathname;
      const pathTab = currentPath.replace(`/users/${id}/profile/`, '');
      setSelectedTab(pathTab);
    });

    if (pathTab === '') {
      setSelectedTab('asking');
    } else {
      setSelectedTab(pathTab);
    }
    
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathTab = currentPath.replace(`/users/${id}/profile/`, '');
  
    if ((selectedTab !== '') && (pathTab !== selectedTab)) {
      console.log('push history', selectedTab);
      window.history.pushState({ tab: selectedTab }, '', `${window.location.origin}/users/${id}/profile/${selectedTab}`);
    }
    
  }, [selectedTab]);

  return (
    <>
      <styled.GlobalStyle />
      <StateProvider currentUser={currentUser} >
        <MainHeader />
        <styled.PageContainer id="UserProfilePage">
          <ProfileDetails name={ name } />
          <ProfileTabs selectedTab={ selectedTab } tabClickHandler={ tabClickHandler } />
          { selectedTab == 'asking' &&
            <AskList />
          }
          { selectedTab == 'claimed' &&
            <ClaimList />
          }
        </styled.PageContainer>
        <MainFooter />
      </StateProvider>
    </>
  );
};

export default UserProfilePage;
