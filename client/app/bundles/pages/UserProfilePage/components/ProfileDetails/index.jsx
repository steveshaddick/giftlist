import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';

const ProfileDetails = (props) => {
  const {
    name
   } = props;

  return (
    <styled.Component>
      <p>{ name }</p>
    </styled.Component>
  );
};

ProfileDetails.propTypes = {
};

export default ProfileDetails;
