import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GiftItem from 'components/GiftItem/GiftItem';

import * as styled from './_styles';

const GiftList = (props) => {
  const { name, items } = props;

  return (
    <styled.Component>
      <styled.Heading>{ name }'s List</styled.Heading>
      <styled.List>
        {items.map((item) => (
          <styled.ListItem key={ item.id }>
            <GiftItem {...item} />
          </styled.ListItem>
        ))}
      </styled.List>
    </styled.Component>
  );
};

GiftList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default GiftList;
