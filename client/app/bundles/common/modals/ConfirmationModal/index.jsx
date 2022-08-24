import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import * as styled from './_styles';

const modalStyles = {
  content: {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100vw - 30px)',
    maxWidth: '400px',
    boxShadow: '0px 0px 5px #ddd',
  },
};

if (document.getElementById('AppContainer')) {
  Modal.setAppElement('#AppContainer');
}

const ConfirmationModal = (props) => {
  const { yesHandler, cancelHandler, children } = props;

  return (
    <Modal isOpen={true} onRequestClose={cancelHandler} style={modalStyles} contentLabel="Confirm">
      <styled.Component>
        <styled.TextContainer>{children}</styled.TextContainer>

        <styled.ButtonsContainer>
          <styled.ConfirmButton onClick={yesHandler}>Yes</styled.ConfirmButton>
          <styled.CancelButton onClick={cancelHandler}>Cancel</styled.CancelButton>
        </styled.ButtonsContainer>
      </styled.Component>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  yesHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  children: PropTypes.array,
};

ConfirmationModal.defaultProps = {
  children: [],
};

export default ConfirmationModal;
