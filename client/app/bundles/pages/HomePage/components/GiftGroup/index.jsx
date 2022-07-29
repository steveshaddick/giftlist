import React from 'react';
import PropTypes from 'prop-types';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const GiftGroup = (props) => {
  const { data, currentUser } = props;
  const { members } = data;

  return (
    <styled.Component>
      <styled.List>
        {members.map((member) => {
          return (
            <li key={ member.id }>
              <layout.GridRow>
                <styled.MemberListLink href={`/users/${member.id}/giftlist`}>
                  { member.name }
                </styled.MemberListLink>
              </layout.GridRow>
            </li>
          )
        })}
      </styled.List>
    </styled.Component>
  );
};

GiftGroup.propTypes = {
  items: PropTypes.array,
};

export default GiftGroup;
