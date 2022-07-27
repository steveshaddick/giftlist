import React, { useState, useEffect, useRef } from 'react';
import { StateProvider } from 'utilities/store.js';
import { getClaimList as apiGetClaimList } from 'utilities/api';

import MainHeader from 'components/MainHeader/MainHeader';
import MainFooter from 'components/MainFooter/MainFooter';
import ProfileDetails from 'components/ProfileDetails/ProfileDetails';
import ProfileTabs from 'components/ProfileTabs/ProfileTabs';
import ClaimList from 'components/ClaimList/ClaimList';
import AskList from 'components/AskList/AskList';
import EditGift from 'components/EditGift/EditGift';

import * as styled from './_styles';

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
          <ProfileTabs
            isNewGift={ isNewGift }
            selectedTab={ selectedTab }
            tabClickHandler={ tabClickHandler }
            newGiftHandler={ newGiftHandler }
            />
          { isNewGift && 
            <EditGift
              isNew={ true }
              currentUser={ currentUser }
              cancelHandler={ cancelNewGiftHandler }
              saveHandler={ saveNewGiftHandler }
            />
          }
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
