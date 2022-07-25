import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';

const ProfileTabs = (props) => {
  const {
    selectedTab,
    tabClickHandler,
   } = props;

  return (
    <styled.Component>
      <styled.TabButton
        selected={ selectedTab === 'asking' }
        data-action="asking"
        onClick={ tabClickHandler }
      >
        Asking List
      </styled.TabButton>
      <styled.TabButton
        selected={ selectedTab === 'claimed' }
        data-action="claimed"
        onClick={ tabClickHandler }
      >
        Claimed List
      </styled.TabButton>
    </styled.Component>
  );
};

ProfileTabs.propTypes = {
};

export default ProfileTabs;
