import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';

const ProfileTabs = (props) => {
  const {
    isNewGift,
    selectedTab,
    tabClickHandler,
    newGiftHandler,
   } = props;

  return (
    <styled.Component>
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

      <styled.ButtonsContainer>
        <styled.NewGiftButton disabled={ isNewGift } onClick={ newGiftHandler }>Add new gift</styled.NewGiftButton>
      </styled.ButtonsContainer>
    </styled.Component>
  );
};

ProfileTabs.propTypes = {
};

export default ProfileTabs;
