import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import * as api from 'utilities/api';

import ConfirmationModal from 'common/modals/ConfirmationModal';
import LockedOverlay from 'common/components/LockedOverlay';
import EditGift from 'common/components/EditGift';

import ClaimListItem from '../ClaimListItem';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

function sortClaims(items) {
  let tmpClaims = {};
  for (let i=0; i<items.length; i++) {
    const item = items[i];
    if (!tmpClaims[item.asker.id]) {
      tmpClaims[item.asker.id] = {
        id: item.asker.id,
        allGot: true,
        name: item.asker.name,
        gifts: [],
      }
    }
    item.originalIndex = i;

    if (item.isGot) {
      tmpClaims[item.asker.id].gifts.push(item);
    } else {
      tmpClaims[item.asker.id].gifts.unshift(item);
      tmpClaims[item.asker.id].allGot = false;
    }
  }

  let claims = [];
  for (let key in tmpClaims) {
    if (tmpClaims[key].allGot) {
      claims.push(tmpClaims[key]);
    } else {
      claims.unshift(tmpClaims[key]);
    }
  }

  return claims;
}

const ClaimList = (props) => {
  function scrollToEdit() {
    editingElement.current.scrollIntoView();
  }

  const [isLocked, setIsLocked] = React.useState(false);
  const [removingItem, setRemovingItem] = React.useState(null);
  const [claims, setClaims] = React.useState({});
  const [isAdding, setIsAdding] = React.useState(false);

  const editingElement = useRef(null);
  let items = useRef([]);
  const hasItems = Object.keys(claims).length > 0;

  const addNewGiftHandler = (giftData) => {
    items.current.push(giftData);
    setClaims(sortClaims(items.current));
    setIsAdding(false);
  }

  const gotHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items.current[parent.dataset.itemIndex];

    item.isGot = !item.isGot;

    api.setGiftGot({
      gift: item,
    }).then(response => {
      setClaims(sortClaims(items.current));
    });
  }

  const unClaimHandler = (e) => {
    const parent = e.currentTarget.closest('[data-item-index]');
    const item = items.current[parent.dataset.itemIndex];
    setRemovingItem(item);
  }

  const confirmRemoveHandler = () => {
    if (isLocked) {
      return;
    }
    setIsLocked(true);

    api.unclaimGift({
      gift: removingItem,
    }).then(response => {
      const newItems = items.current.filter(item => item.id !== removingItem.id);
      setRemovingItem(null);
      setIsLocked(false);
      setClaims(sortClaims(newItems));
    });
  }

  const cancelRemoveHandler = () => {
    setRemovingItem(null);
  }

  useEffect(() => {
    api.getClaimedList()
      .then(response => {
        const { success, data } = response;
        if (success){
          items.current = data;
          setClaims(sortClaims(data));
        }
      });
  }, []);

  return (
    <styled.Component>
      { isAdding &&
        <layout.GridRow>
          <styled.TopContainer ref={ editingElement }>
              <EditGift
                isPrivate={ true }
                saveHandler={ addNewGiftHandler }
                cancelHandler={ () => { setIsAdding(false); } }
                />
          </styled.TopContainer>
        </layout.GridRow>
      }
      { hasItems ?
        <styled.List>
          {Object.keys(claims).map((key) => {
            const claim = claims[key];
            return (
            <styled.ListItem key={ claim.id }>
              <styled.AskerNameContainer>
                <layout.GridRow>
                  <styled.AskerName>
                    for <a href={`/users/${claim.id}/giftlist`}>{ claim.name }</a>:
                  </styled.AskerName>
                </layout.GridRow>
              </styled.AskerNameContainer>

              <styled.List>
                {claim.gifts.map((item) => (
                  <styled.ListItem key={ item.id }>
                    <ClaimListItem
                      index={ item.originalIndex }
                      unClaimHandler = { unClaimHandler }
                      gotHandler = { gotHandler }
                      {...item}
                      />
                </styled.ListItem>
                ))}
              </styled.List>
            </styled.ListItem>
            );  
          })}
        </styled.List>
        :
        <styled.EmptyList>
          You haven't claimed any gifts yet.
        </styled.EmptyList>
      }
      
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

      { removingItem &&
        <ConfirmationModal
          yesHandler={ confirmRemoveHandler }
          cancelHandler={ cancelRemoveHandler } 
        >
          <p>Unclaim <span className="gift-title">{ removingItem.title }</span>?</p>
        </ConfirmationModal>
      }

      { isLocked &&
        <LockedOverlay />
      }
    </styled.Component>
  );
};

ClaimList.propTypes = {
  name: PropTypes.string,
};

export default ClaimList;
