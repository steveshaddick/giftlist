import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { store } from 'utilities/store.js';
import {
  getAskingList as apiGetAskingList,
  deleteGift as apiDeleteGift,
} from 'utilities/api';

import AskListItem from 'components/AskListItem/AskListItem';
import EditGift from 'components/EditGift/EditGift';
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

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [deletingItem, setDeletingItem] = React.useState(null);
  const [giftAction, setGiftAction] = React.useState(null);
  const [items, setItems] = React.useState({});
  const [isApi, setIsApi] = React.useState(false);

  const editItemHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    console.log('editing', item);
    setEditingItem(item);
    openModal();
  }

  const deleteHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    console.log('deleting', item);
    setDeletingItem(item);
    openModal();
  }

  function confirmMessage() {
    return (
      <p>Delete <span className="gift-title">{ deletingItem.title }</span>?</p>
    );
  }

  const confirmDeleteHandler = () => {
    apiDeleteGift({
      gift: deletingItem,
    }).then(response => {
      const newItems = items.filter(item => item.id !== deletingItem.id);
      setItems(newItems);
      closeModal();
    });
  }

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setEditingItem(null);
    setDeletingItem(null);
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
              deleteHandler={ deleteHandler }
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
        { editingItem && 
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
              closeModal();
            }}
            {...editingItem}
            />
        }
        { deletingItem &&
          <ConfirmActionModal
            message={ confirmMessage() }
            yesHandler={ confirmDeleteHandler }
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
