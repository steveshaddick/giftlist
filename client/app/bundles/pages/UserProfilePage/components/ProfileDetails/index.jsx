import React from 'react';
import PropTypes from 'prop-types';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const ProfileDetails = (props) => {
  const { name } = props;

  return (
    <styled.Component>
      <layout.GridRow>
        <p>{name}</p>
      </layout.GridRow>
    </styled.Component>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProfileDetails;
