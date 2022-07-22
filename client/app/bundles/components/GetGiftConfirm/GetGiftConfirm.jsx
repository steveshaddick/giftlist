import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';

const GetGiftConfirm = (props) => {
  const {
    name,
    gift,
    yesHandler,
    cancelHandler
   } = props;

  return (
    <styled.Component>
      <styled.TextContainer>
        <p>You want to get <span className="gift-title">{ gift.title }</span> for { name }?</p>
      </styled.TextContainer>

      <styled.ButtonsContainer>
        <styled.ConfirmButton onClick={ yesHandler }>Yes</styled.ConfirmButton>
        <styled.CancelButton onClick={ cancelHandler }>Cancel</styled.CancelButton>
      </styled.ButtonsContainer>
    </styled.Component>
  );
};

GetGiftConfirm.propTypes = {
};

export default GetGiftConfirm;
