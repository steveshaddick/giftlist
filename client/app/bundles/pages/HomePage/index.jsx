import React from 'react';
import PropTypes from 'prop-types';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader/';
import MainFooter from 'pages/common/MainFooter';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';
import GiftGroup from './components/GiftGroup';
import * as styled from './_styles';

const HomePage = (props) => {
  const { currentUser, giftGroups } = props;

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser}>
        <MainHeader />
        <layout.PageContainer id="HomePage">
          <styled.MyListsSection>
            <styled.MyListsLink href={`/users/${currentUser.id}/profile`}>
              My Lists
            </styled.MyListsLink>
          </styled.MyListsSection>

          {giftGroups.map((group) => (
            <GiftGroup key={group.id} currentUser={currentUser} data={group} />
          ))}
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

HomePage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  giftGroups: PropTypes.array.isRequired,
};

export default HomePage;
