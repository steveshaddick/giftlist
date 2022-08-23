import React from 'react';
import PropTypes from 'prop-types';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader/';
import MainFooter from 'pages/common/MainFooter';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';
import GiftGroup from './components/GiftGroup';

const HomePage = (props) => {
  const { currentUser, giftGroups } = props;

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser} >
        <MainHeader />
        <layout.PageContainer id="HomePage">
          {giftGroups.map((group) => <GiftGroup key={ group.id } currentUser={ currentUser } data={ group } />)}
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
