import React from 'react';
import PropTypes from 'prop-types';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const ProfileTabs = (props) => {
  const { selectedTab, tabClickHandler } = props;

  return (
    <styled.Component>
      <layout.GridRow>
        <styled.TabsContainer aria-label="List Navigation">
          <styled.TabButton
            selected={selectedTab === 'asklist'}
            aria-current={selectedTab === 'asklist'}
            data-action="asklist"
            onClick={tabClickHandler}
          >
            Asking List
          </styled.TabButton>
          <styled.TabButton
            selected={selectedTab === 'claimlist'}
            aria-current={selectedTab === 'claimlist'}
            data-action="claimlist"
            onClick={tabClickHandler}
          >
            Claimed List
          </styled.TabButton>
        </styled.TabsContainer>
      </layout.GridRow>
    </styled.Component>
  );
};

ProfileTabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  tabClickHandler: PropTypes.func.isRequired,
};

export default ProfileTabs;
