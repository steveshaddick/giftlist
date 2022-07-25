import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { store } from 'utilities/store.js';
import { claimGift as apiClaimGift, unClaimGift as apiUnClaimGift } from 'utilities/api';

import GiftItem from 'components/GiftItem/GiftItem';
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

const GiftList = (props) => {
  const globalState = useContext(store);
  const { currentUser } = globalState.state;

  const { name, items } = props;

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [giftAction, setGiftAction] = React.useState(null); 

  const claimHandler = (e) => {
    setSelectedItem(items[e.currentTarget.dataset.itemIndex]);
    setGiftAction('claim');
    openModal();
  }

  const unClaimHandler = (e) => {
    setSelectedItem(items[e.currentTarget.dataset.itemIndex]);
    setGiftAction('unclaim');
    openModal();
  }

  const confirmActionHandler = () => {
    switch (giftAction) {
      case 'claim':
        apiClaimGift({
          gift: selectedItem,
          currentUser: currentUser,
        })
          .then(response => {
            selectedItem.claimer = {
              id: currentUser.id,
              name: currentUser.name,
            };
            setSelectedItem(null);
            setGiftAction(null);
          });
        break;
      
      case 'unclaim':
        apiUnClaimGift({
          gift: selectedItem,
        })
          .then(response => {
            selectedItem.claimer = null;
            setSelectedItem(null);
            setGiftAction(null);
          });
        break;
    }
    
    setModalOpen(false);
  }

  function confirmMessage() {
    switch (giftAction) {
      case 'claim':
        return (
          <p>You want to get <span className="gift-title">{ selectedItem.title }</span> for { name }?</p>
        );

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

  return (
    <styled.Component>
      <styled.Heading>{ name }'s List</styled.Heading>
      <styled.List>
        {items.map((item, index) => (
          <styled.ListItem key={ item.id }>
            <GiftItem
              claimHandler={ claimHandler }
              unClaimHandler = { unClaimHandler }
              index={ index }
              currentUser={ currentUser }
              {...item}
              />
          </styled.ListItem>
        ))}
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

GiftList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default GiftList;
