import React from 'react';
import PropTypes from 'prop-types';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const ProfileTabs = (props) => {
  const {
    selectedTab,
    tabClickHandler,
   } = props;

  return (
    <styled.Component>
      <layout.GridRow>
        <styled.TabsContainer>
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
        </styled.TabsContainer>
      </layout.GridRow>
    </styled.Component>
  );
};

ProfileTabs.propTypes = {
};

export default ProfileTabs;
