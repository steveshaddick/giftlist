import React from 'react';

import * as api from 'utilities/api';

import * as styled from './_styles';

const MainFooter = () => {

  const signoutClickHandler = (e) => {
    e.preventDefault();

    api.signout().then(response => {
      console.log("DONE", response);
      window.location = "/";
    });
  }

  return (
    <footer>
        <styled.FooterBlock>
          <styled.FooterNav>
            <styled.FooterNavList>
              <li><a href="/users/sign_out" onClick={ signoutClickHandler }>Sign Out</a></li>
            </styled.FooterNavList>
          </styled.FooterNav>
        </styled.FooterBlock>
    </footer>
  );
};

export default MainFooter;
