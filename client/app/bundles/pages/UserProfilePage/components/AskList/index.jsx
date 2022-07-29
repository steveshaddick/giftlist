import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import * as api from 'utilities/api';

import ConfirmationModal from 'common/modals/ConfirmationModal';
import EditGift from 'common/components/EditGift';
import LockedOverlay from 'common/components/LockedOverlay';

import AskListItem from '../AskListItem';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const AskList = (props) => {
  function scrollToEdit() {
    editingElement.current.scrollIntoView();
  }

  const [scrollToItem, setScrollToItem] = React.useState(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const [deletingItem, setDeletingItem] = React.useState(null);
  const [items, setItems] = React.useState({});
  const [isLocked, setIsLocked] = React.useState(false);

  const editingElement = useRef(null);

  const addNewGiftHandler = (giftData) => {
    items.push(giftData);
    setItems(items);
    setIsAdding(false);
  }

  const editItemHandler = (newItem) => {
    const newItems = items.map(item => {
        return (item.id === newItem.id) ? newItem : item;
    });
    setItems(newItems);
    setScrollToItem(newItem.id);
  }

  const deleteHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    setDeletingItem(item);
  }

  const confirmDeleteHandler = () => {
    if (isLocked) {
      return;
    }
    setIsLocked(true);

    api.deleteGift({
      gift: deletingItem,
    }).then(response => {
      const newItems = items.filter(item => item.id !== deletingItem.id);
      setDeletingItem(null);
      setIsLocked(false);
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

  useEffect(() => {
    if (scrollToItem) {
      const el = document.querySelector(`[data-item-id="${scrollToItem}"]`);
      if (el) {
        el.scrollIntoView();
      }
    }
  }, [scrollToItem]);

  return (
    <styled.Component>
      <layout.GridRow>
        <styled.TopContainer ref={ editingElement }>
          { !isAdding &&
            <styled.AddButton onClick={() => {
              setIsAdding(true);
            }}>Add to list</styled.AddButton>
          }
          
          { isAdding &&
            <EditGift
              saveHandler={ addNewGiftHandler }
              cancelHandler={ () => { setIsAdding(false); } }
              />
          }
        </styled.TopContainer>
      </layout.GridRow>
      
      <styled.List>
        {items.length && items.map((item, index) => (
          <styled.ListItem key={ item.id } data-item-id={ item.id }>
            <AskListItem
              index={ index }
              gift={ item }
              editHandler={ editItemHandler }
              deleteHandler={ deleteHandler }
              />
          </styled.ListItem>
        ))}
      </styled.List>
      
      <layout.GridRow>
        <styled.BottomContainer>
          <styled.AddButton onClick={() => {
            if (isAdding) {
              scrollToEdit();
            } else {
              setIsAdding(true);
            }
          }}>Add to list</styled.AddButton>
        </styled.BottomContainer>
      </layout.GridRow>
      
      { deletingItem &&
        <ConfirmationModal
          yesHandler={ confirmDeleteHandler }
          cancelHandler={ cancelDeleteHandler } 
        >
          <p>Delete <span className="gift-title">{ deletingItem.title }</span>?</p>
        </ConfirmationModal>
      }

      { isLocked &&
        <LockedOverlay />
      }
    </styled.Component>
  );
};

AskList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default AskList;
