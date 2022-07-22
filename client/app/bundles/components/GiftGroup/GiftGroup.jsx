import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GiftItem from 'components/GiftItem/GiftItem';

import * as styled from './_styles';

const GiftGroup = (props) => {
  const { data, currentUser } = props;
  const { members } = data;

  return (
    <styled.Component>
      <styled.List>
        {members.map((member) => {
          if (member.id !== currentUser.id) {
            return (
              <li>
                <styled.MemberListLink href={`/users/${member.id}/giftlist`}>
                  { member.name }
                </styled.MemberListLink>
              </li>
            )
          }
        })}
      </styled.List>
    </styled.Component>
  );
};

GiftGroup.propTypes = {
  items: PropTypes.array,
};

export default GiftGroup;
