import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import * as api from 'utilities/api';
import { getCurrentUser } from 'utilities/CurrentUserContext';

import ConfirmationModal from 'common/modals/ConfirmationModal';
import EditGift from 'common/components/EditGift';
import LockedOverlay from 'common/components/LockedOverlay'
import GiftItem from '../GiftItem';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const GiftList = (props) => {
  function scrollToEdit() {
    editingElement.current.scrollIntoView();
  }

  const { user, items: initialItems } = props;
  const { id: userId, name: userName } = user;
  const currentUser = getCurrentUser();

  const isCurrentUserList = userId === currentUser.id;

  const [isLocked, setIsLocked] = useState(false);
  const [scrollToItem, setScrollToItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [claimItem, setClaimItem] = useState(null);
  const [unclaimItem, setUnclaimItem] = useState(null);
  const [items, setItems] = useState(initialItems);

  const editingElement = useRef(null);

  const claimHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    setClaimItem(item);
  }

  const confirmClaimHandler = () => {
    api.claimGift({
      gift: claimItem,
    })
      .then(response => {
        const { success, data: gift } = response;
        if (success) {
          const newItems = items.map(item => {
            if (item.id !== gift.id) {
              return item;
            } else {
              return gift;
            }
          })
          setItems(newItems);
        }
        setClaimItem(null);
      });
  }

  const cancelClaimHandler = () => {
    setClaimItem(null);
  }

  const unClaimHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items[parent.dataset.itemIndex];
    setUnclaimItem(item);
  }

  const confirmUnclaimHandler = () => {
    api.unclaimGift({
      gift: unclaimItem,
    })
      .then(response => {
        const { success, data: gift } = response;
        if (success) {
          const newItems = items.map(item => {
            if (item.id !== gift.id) {
              return item;
            } else {
              return gift;
            }
          })
          setItems(newItems);
        }
        setUnclaimItem(null);
      });
  }

  const cancelUnclaimHandler = () => {
    setUnclaimItem(null);
  }

  const addNewGiftHandler = (giftData) => {
    items.push(giftData);
    setItems(items);
    setIsAdding(false);
  }

  const editClickHandler = (e) => {
    const newItems = items.map(item => {
        return (item.id === newItem.id) ? newItem : item;
    });
    setItems(newItems);
    setScrollToItem(newItem.id);
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
      const { success } = response;
      setDeletingItem(null);
      setIsLocked(false);
      if (success) {
        const newItems = items.filter(item => item.id !== deletingItem.id);
        setItems(newItems);
      } else {
        alert("There was an error, please try again.");
      }
    });
  }

  const cancelDeleteHandler = () => {
    setDeletingItem(null);
  }

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
      <styled.HeadingContainer>
        <layout.GridRow>
          <styled.Heading>{ userName }'s List</styled.Heading>
        </layout.GridRow>
      </styled.HeadingContainer>

      { isAdding &&
        <layout.GridRow>
          <styled.TopContainer ref={ editingElement }>
              <EditGift
                askerId={ userId }
                isGroup={ true }
                saveHandler={ addNewGiftHandler }
                cancelHandler={ () => { setIsAdding(false); } }
                />
          </styled.TopContainer>
        </layout.GridRow>
      }

      <styled.List>
        {items.map((item, index) => {
          const { id: giftId } = item;
          return (
            <styled.ListItem key={ giftId }>
              <GiftItem
                index={ index }
                gift={ item }
                enableClaimed={ !isCurrentUserList }
                currentUser={ currentUser }
                claimHandler={ claimHandler }
                unClaimHandler = { unClaimHandler }
                editHandler={ editItemHandler }
                deleteClickHandler={ deleteHandler }
                />
            </styled.ListItem>
          );
        })}
      </styled.List>

      { !isAdding && !isCurrentUserList &&
        <layout.GridRow>
          <styled.AddButton onClick={() => {
            setIsAdding(true);
          }}>Add group gift</styled.AddButton>
        </layout.GridRow>
      }

      { isLocked &&
        <LockedOverlay />
      }
      
      { claimItem &&
        <ConfirmationModal
          yesHandler={ confirmClaimHandler }
          cancelHandler={ cancelClaimHandler } 
        >
          <p>You want to get <span className="gift-title">{ claimItem.title }</span> for { userName }?</p>
        </ConfirmationModal>
      }
      
      { unclaimItem &&
        <ConfirmationModal
          yesHandler={ confirmUnclaimHandler }
          cancelHandler={ cancelUnclaimHandler } 
        >
          <p>Unclaim <span className="gift-title">{ unclaimItem.title }</span>?</p>
        </ConfirmationModal>
      }
      
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

GiftList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default GiftList;
