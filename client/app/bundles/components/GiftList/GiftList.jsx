import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { store } from 'utilities/store.js';
import { claimGift as apiClaimGift } from 'utilities/api';

import GiftItem from 'components/GiftItem/GiftItem';
import ClaimGiftConfirm from 'components/ClaimGiftConfirm/ClaimGiftConfirm';

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

  const getItHandler = (e) => {
    setSelectedItem(items[e.currentTarget.dataset.itemIndex]);
    openModal();
  }

  const confirmClaimGiftHandler = () => {
    apiClaimGift({
      gift: selectedItem,
      currentUser: currentUser,
    })
      .then(response => {
        console.log("CONFIRM GET GIFT", response);
      });
    
    setModalOpen(false);
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
            <GiftItem getItHandler={ getItHandler } index={ index } {...item} />
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
          <ClaimGiftConfirm name={ name } gift={ selectedItem } yesHandler={ confirmClaimGiftHandler } cancelHandler={ closeModal } />
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
