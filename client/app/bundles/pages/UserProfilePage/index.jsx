import React, { useState, useEffect, useRef } from 'react';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader';
import MainFooter from 'pages/common/MainFooter';

import ProfileDetails from './components/ProfileDetails';
import ProfileTabs from './components/ProfileTabs';
import ClaimList from './components/ClaimList';
import AskList from './components/AskList';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';

const UserProfilePage = (props) => {
  const { currentUser, tab } = props;
  const { id, name } = currentUser;

  const [selectedTab, setSelectedTab] = useState('');
  const [isNewGift, setIsNewGift] = useState(false);
  let lastTab = useRef('');

  const tabClickHandler = (e) => {
    const tab = e.currentTarget.dataset.action;
    setIsNewGift(false);
    setSelectedTab(tab);
  }

  const newGiftHandler = () => {
    setIsNewGift(true);
  }

  const cancelNewGiftHandler = () => {
    setIsNewGift(false);
  }

  const saveNewGiftHandler = () => {
    // TODO refactor this as a state reducer, probably
    window.location.reload();
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
      window.history.pushState({ tab: selectedTab }, '', `${window.location.origin}/users/${id}/profile/${selectedTab}`);
    }
    
  }, [selectedTab]);

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser} >
        <MainHeader />
        <layout.PageContainer id="UserProfilePage">
          <ProfileDetails name={ name } />
          <ProfileTabs
            isNewGift={ isNewGift }
            selectedTab={ selectedTab }
            tabClickHandler={ tabClickHandler }
            newGiftHandler={ newGiftHandler }
            />
          { selectedTab == 'asking' &&
            <AskList />
          }
          { selectedTab == 'claimed' &&
            <ClaimList />
          }
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

export default UserProfilePage;
