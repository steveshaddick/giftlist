import React, { useEffect, useRef, useState } from 'react';

import * as api from 'utilities/api';
import { getCurrentUser } from 'utilities/CurrentUserContext';

import ConfirmationModal from 'common/modals/ConfirmationModal';
import EditGift from 'common/components/EditGift';
import LockedOverlay from 'common/components/LockedOverlay';

import * as layout from 'common/_styles/layout';
import AskListItem from '../AskListItem';

import * as styled from './_styles';

const AskList = () => {
  const [scrollToItem, setScrollToItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [items, setItems] = useState({});
  const [isLocked, setIsLocked] = useState(false);

  const currentUser = getCurrentUser();
  const editingElement = useRef(null);

  function scrollToEdit() {
    editingElement.current.scrollIntoView();
  }

  const addNewGiftHandler = (giftData) => {
    items.push(giftData);
    setItems(items);
    setIsAdding(false);
  };

  const editItemHandler = (newItem) => {
    const newItems = items.map((item) => (item.id === newItem.id ? newItem : item));
    setItems(newItems);
    setScrollToItem(newItem.id);
  };

  const deleteHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    setDeletingItem(item);
  };

  const confirmDeleteHandler = () => {
    if (isLocked) {
      return;
    }
    setIsLocked(true);

    api
      .deleteGift({
        gift: deletingItem,
      })
      .then((response) => {
        const { success } = response;
        if (success) {
          const newItems = items.filter((item) => item.id !== deletingItem.id);
          setItems(newItems);
        }
        setDeletingItem(null);
        setIsLocked(false);
      });
  };

  const cancelDeleteHandler = () => {
    setDeletingItem(null);
  };

  useEffect(() => {
    api.getAskingList().then((response) => {
      const { success, data } = response;
      if (success) {
        setItems(data);
      }
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
        <styled.TopContainer ref={editingElement}>
          {!isAdding && (
            <styled.AddButton
              onClick={() => {
                setIsAdding(true);
              }}
            >
              Add to list
            </styled.AddButton>
          )}

          {isAdding && (
            <EditGift
              askerId={currentUser.id}
              saveHandler={addNewGiftHandler}
              cancelHandler={() => {
                setIsAdding(false);
              }}
            />
          )}
        </styled.TopContainer>
      </layout.GridRow>

      {!items.length && <styled.EmptyList>You haven&apos;t added any gifts yet.</styled.EmptyList>}
      {items.length > 0 && (
        <styled.List>
          {items.map((item, index) => (
            <styled.ListItem key={item.id} data-item-id={item.id}>
              <AskListItem
                index={index}
                gift={item}
                editHandler={editItemHandler}
                deleteHandler={deleteHandler}
              />
            </styled.ListItem>
          ))}
        </styled.List>
      )}

      <layout.GridRow>
        <styled.BottomContainer>
          <styled.AddButton
            onClick={() => {
              if (isAdding) {
                scrollToEdit();
              } else {
                setIsAdding(true);
              }
            }}
          >
            Add to list
          </styled.AddButton>
        </styled.BottomContainer>
      </layout.GridRow>

      {deletingItem && (
        <ConfirmationModal yesHandler={confirmDeleteHandler} cancelHandler={cancelDeleteHandler}>
          <p>
            Delete <span className="gift-title">{deletingItem.title}</span>?
          </p>
        </ConfirmationModal>
      )}

      {isLocked && <LockedOverlay />}
    </styled.Component>
  );
};

export default AskList;
