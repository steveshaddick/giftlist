import React from 'react';
import PropTypes from 'prop-types';
import { CurrentUserProvider } from 'utilities/CurrentUserContext';

import MainHeader from 'pages/common/MainHeader';
import MainFooter from 'pages/common/MainFooter';

import { GlobalStyle } from 'common/_styles/global';
import * as layout from 'common/_styles/layout';
import AccountDetails from './components/AccountDetails';
import * as styled from './_styles';

const AccountPage = (props) => {
  const { currentUser } = props;
  const { id, name, email } = currentUser;

  return (
    <>
      <GlobalStyle />
      <CurrentUserProvider currentUser={currentUser}>
        <MainHeader />
        <layout.PageContainer id="AccountPage">
          <main>
            <AccountDetails name={name} email={email} />
            <styled.MyListsSection>
              <styled.MyListsLink href={`/users/${id}/profile`}>
                My Lists
              </styled.MyListsLink>
            </styled.MyListsSection>
          </main>
        </layout.PageContainer>
        <MainFooter />
      </CurrentUserProvider>
    </>
  );
};

AccountPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default AccountPage;
