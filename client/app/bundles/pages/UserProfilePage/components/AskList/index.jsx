import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import * as api from 'utilities/api';

import AskListItem from '../AskListItem';
import EditGift from 'components/EditGift/EditGift';
import ConfirmationModal from 'common/modals/ConfirmationModal';

import * as styled from './_styles';

const AskList = (props) => {
  function scrollToEdit() {
    editingElement.current.scrollIntoView();
  }

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [deletingItem, setDeletingItem] = React.useState(null);
  const [giftAction, setGiftAction] = React.useState(null);
  const [items, setItems] = React.useState({});
  const [isApi, setIsApi] = React.useState(false);

  const editingElement = useRef(null);

  const editItemHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    setEditingItem(item);
    openModal();
  }

  const deleteHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    setDeletingItem(item);
  }

  const addNewGiftHandler = (giftData) => {
    items.push(giftData);
    setItems(items);
    setIsAdding(false);
  }

  const confirmDeleteHandler = () => {
    api.deleteGift({
      gift: deletingItem,
    }).then(response => {
      const newItems = items.filter(item => item.id !== deletingItem.id);
      setDeletingItem(null);
      setItems(newItems);
    });
  }

  const cancelDeleteHandler = () => {
    setDeletingItem(null);
  }

  useEffect(() => {
    api
      .getAskingList()
      .then(response => {
        setItems(response);
      });
  }, []);


  useEffect(() => {
    if (isAdding) {
      scrollToEdit();
    }
  }, [isAdding]);

  return (
    <styled.Component>
      <styled.TopContainer ref={ editingElement }>
        { !isAdding &&
          <styled.AddButton onClick={() => {
            setIsAdding(true);
          }}>Add to list</styled.AddButton>
        }
        
        { isAdding &&
          <EditGift
            isNew={ true }
            apiSave={ api.addAskingGift }
            saveHandler={ addNewGiftHandler }
            cancelHandler={ () => { setIsAdding(false); } }
            />
        }
      </styled.TopContainer>

      
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

      <styled.BottomContainer>
        <styled.AddButton onClick={() => {
          if (isAdding) {
            scrollToEdit();
          } else {
            setIsAdding(true);
          }
        }}>Add to list</styled.AddButton>
      </styled.BottomContainer>
      
      { deletingItem &&
        <ConfirmationModal
          yesHandler={ confirmDeleteHandler }
          cancelHandler={ cancelDeleteHandler } 
        >
          <p>Delete <span className="gift-title">{ deletingItem.title }</span>?</p>
        </ConfirmationModal>
      }
    </styled.Component>
  );
};

AskList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default AskList;
