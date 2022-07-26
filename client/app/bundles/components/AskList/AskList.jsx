import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { store } from 'utilities/store.js';
import {
  unClaimGift as apiUnClaimGift,
  setGiftGot as apiSetGiftGot,
  getAskingList as apiGetAskingList
} from 'utilities/api';

import AskListItem from 'components/AskListItem/AskListItem';
import ConfirmActionModal from 'components/ConfirmActionModal/ConfirmActionModal';

import * as styled from './_styles';

const customStyles = {
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

Modal.setAppElement('#AppContainer');

const AskList = (props) => {
  const globalState = useContext(store);
  const { currentUser } = globalState.state;

  const { items } = props;
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [giftAction, setGiftAction] = React.useState(null);
  const [claims, setClaims] = React.useState({});
  const [isApi, setIsApi] = React.useState(false);

  const unClaimHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    setSelectedItem(item);
    setGiftAction('unclaim');
    openModal();
  }

  const gotHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];

    item.isGot = !item.isGot;

    setIsApi(true);
    apiSetGiftGot({
      gift: item,
    }).then(response => {
      setIsApi(false);
    });
  }

  const confirmActionHandler = () => {
    switch (giftAction) {
      case 'unclaim':
        apiUnClaimGift({
          gift: selectedItem,
        })
          .then(response => {
            // ugh
            location.reload();
            setSelectedItem(null);
            setGiftAction(null);
          });
        break;
    }
    
    setModalOpen(false);
  }

  function confirmMessage() {
    switch (giftAction) {
      case 'unclaim':
        return (
          <p>Unclaim <span className="gift-title">{ selectedItem.title }</span>?</p>
        );
    }
  }

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }

  useEffect(() => {
    apiGetAskingList({
      currentUser
    }).then(response => {
      console.log(response);
    })
  }, [items]);

  return (
    <styled.Component>
      <styled.List>
        List!
      </styled.List>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirm Gift"
      >
        { selectedItem && 
          <ConfirmActionModal
            message={ confirmMessage() }
            yesHandler={ confirmActionHandler }
            cancelHandler={ closeModal } 
            />
        }
      </Modal>
    </styled.Component>
  );
};

AskList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default AskList;
