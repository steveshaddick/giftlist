import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import * as api from 'utilities/api';
import { getCurrentUser } from 'utilities/CurrentUserContext';

import ConfirmationModal from 'common/modals/ConfirmationModal';
import GiftItem from '../GiftItem';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const GiftList = (props) => {
  const { user, items: initialItems } = props;
  const { id: userId, name: userName } = user;
  const currentUser = getCurrentUser();

  const isCurrentUserList = userId === currentUser.id;

  const [claimItem, setClaimItem] = React.useState(null);
  const [unclaimItem, setUnclaimItem] = React.useState(null);
  const [items, setItems] = React.useState(initialItems);

  const claimHandler = (e) => {
    setClaimItem(items[e.currentTarget.dataset.itemIndex]);
  }

  const confirmClaimHandler = () => {
    api.claimGift({
      gift: claimItem,
    })
      .then(response => {
        const newItems = items.map(item => {
          if (item.id !== response.id) {
            return item;
          } else {
            return response;
          }
        })
        setItems(newItems);
        setClaimItem(null);
      });
  }

  const cancelClaimHandler = () => {
    setClaimItem(null);
  }

  const unClaimHandler = (e) => {
    setUnclaimItem(items[e.currentTarget.dataset.itemIndex]);
  }

  const confirmUnclaimHandler = () => {
    api.unclaimGift({
      gift: unclaimItem,
    })
      .then(response => {
        const newItems = items.map(item => {
          if (item.id !== response.id) {
            return item;
          } else {
            return response;
          }
        })
        setItems(newItems);
        setUnclaimItem(null);
      });
  }

  const cancelUnclaimHandler = () => {
    setUnclaimItem(null);
  }

  return (
    <styled.Component>
      <styled.HeadingContainer>
        <layout.GridRow>
          <styled.Heading>{ userName }'s List</styled.Heading>
        </layout.GridRow>
      </styled.HeadingContainer>

      <styled.List>
        {items.map((item, index) => {
          const { claimer } = item;
          const currentUserClaimed = claimer && claimer.id === currentUser.id;
          return (
            <styled.ListItem key={ item.id }>
              <GiftItem
                index={ index }
                gift={ item }
                enableClaimed={ !isCurrentUserList }
                currentUserClaimed={ currentUserClaimed }
                claimHandler={ claimHandler }
                unClaimHandler = { unClaimHandler }
                />
            </styled.ListItem>
          );
        })}
      </styled.List>
      
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
    </styled.Component>
  );
};

GiftList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default GiftList;
