import React from 'react';
import PropTypes from 'prop-types';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const AccountDetails = (props) => {
  const { name, email } = props;

  return (
    <styled.Component>
      <layout.GridRow>
        <h2>Account</h2>
        <dl>
          <dt>Name</dt>
          <dd>{name}</dd>
          <dt>Email</dt>
          <dd>{email}</dd>
        </dl>
      </layout.GridRow>
    </styled.Component>
  );
};

AccountDetails.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default AccountDetails;
