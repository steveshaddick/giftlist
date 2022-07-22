import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GiftItem from 'components/GiftItem/GiftItem';

import * as styled from './_styles';

const GiftList = (props) => {
  const { items } = props;

  console.log(items);

  return (
    <styled.List>
      {items.map((item) => (
        <styled.ListItem key={ item.id }>
          <GiftItem {...item} />
        </styled.ListItem>
      ))}
    </styled.List>
  );
};

GiftList.propTypes = {
  items: PropTypes.array,
};

export default GiftList;
