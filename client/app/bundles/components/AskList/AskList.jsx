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
import EditGift from 'components/EditGift/EditGift';

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

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [giftAction, setGiftAction] = React.useState(null);
  const [items, setItems] = React.useState({});
  const [isApi, setIsApi] = React.useState(false);

  const editItemHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    console.log(item);
    setSelectedItem(item);
    openModal();
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
      setItems(response);
    })
  }, []);

  return (
    <styled.Component>
      <styled.List>
        {items.length && items.map((item, index) => (
          <styled.ListItem key={ item.id }>
            <AskListItem
              index={ index }
              editHandler={ editItemHandler }
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
          <EditGift
            saveHandler={(newItem) => {
              const newItems = items.map((item) => {
                if (item.id === newItem.id) {
                  return newItem;
                } else {
                  return item;
                }
              });
              console.log(newItems);
              setItems(newItems);
              closeModal();
            }}
            cancelhandler={() => {
              setSelectedItem(null);
              closeModal();
            }}
            {...selectedItem}
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
