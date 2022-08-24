import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader';
import MainFooter from 'pages/common/MainFooter';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';
import ProfileDetails from './components/ProfileDetails';
import ProfileTabs from './components/ProfileTabs';
import ClaimList from './components/ClaimList';
import AskList from './components/AskList';

const UserProfilePage = (props) => {
  const { currentUser } = props;
  const { id, name } = currentUser;

  const [selectedTab, setSelectedTab] = useState('');
  const [isNewGift, setIsNewGift] = useState(false);

  const tabClickHandler = (e) => {
    const tab = e.currentTarget.dataset.action;
    setIsNewGift(false);
    setSelectedTab(tab);
  };

  const newGiftHandler = () => {
    setIsNewGift(true);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathTab = currentPath.replace(`/users/${id}/profile/`, '');

    window.addEventListener('popstate', () => {
      const windowPath = window.location.pathname;
      const windowTab = windowPath.replace(`/users/${id}/profile/`, '');
      setSelectedTab(windowTab);
    });

    if (pathTab === '') {
      setSelectedTab('asklist');
    } else {
      setSelectedTab(pathTab);
    }
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathTab = currentPath.replace(`/users/${id}/profile/`, '');

    if (selectedTab !== '' && pathTab !== selectedTab) {
      window.history.pushState(
        { tab: selectedTab },
        '',
        `${window.location.origin}/users/${id}/profile/${selectedTab}`,
      );
    }
  }, [selectedTab]);

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser}>
        <MainHeader />
        <layout.PageContainer id="UserProfilePage">
          <ProfileDetails name={name} />
          <ProfileTabs
            isNewGift={isNewGift}
            selectedTab={selectedTab}
            tabClickHandler={tabClickHandler}
            newGiftHandler={newGiftHandler}
          />
          <main>
            {selectedTab === 'asklist' && <AskList />}
            {selectedTab === 'claimlist' && <ClaimList />}
          </main>
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

UserProfilePage.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default UserProfilePage;
