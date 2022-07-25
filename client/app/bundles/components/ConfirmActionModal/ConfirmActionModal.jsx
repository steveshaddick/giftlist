import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';

const ConfirmActionModal = (props) => {
  const {
    message,
    gift,
    yesHandler,
    cancelHandler
   } = props;

  return (
    <styled.Component>
      <styled.TextContainer>
        { message }
      </styled.TextContainer>

      <styled.ButtonsContainer>
        <styled.ConfirmButton onClick={ yesHandler }>Yes</styled.ConfirmButton>
        <styled.CancelButton onClick={ cancelHandler }>Cancel</styled.CancelButton>
      </styled.ButtonsContainer>
    </styled.Component>
  );
};

ConfirmActionModal.propTypes = {
};

export default ConfirmActionModal;
