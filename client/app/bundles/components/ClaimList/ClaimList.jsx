import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { store } from 'utilities/store.js';
import { unClaimGift as apiUnClaimGift } from 'utilities/api';

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

const ClaimList = (props) => {
  const globalState = useContext(store);
  const { currentUser } = globalState.state;

  const { items } = props;
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [giftAction, setGiftAction] = React.useState(null);
  const [claims, setClaims] = React.useState({});

  const unClaimHandler = (e) => {
    setSelectedItem(items[e.currentTarget.dataset.itemIndex]);
    setGiftAction('unclaim');
    openModal();
  }

  const confirmActionHandler = () => {
    switch (giftAction) {
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
    // This really needs to be refactored
    let claims = {};
    for (let i=0; i<items.length; i++) {
      const item = items[i];
      if (!claims[item.asker.id]) {
        claims[item.asker.id] = {
          name: item.asker.name,
          gifts: [],
        }
      }

      claims[item.asker.id].gifts.push(item);
      console.log("EFFECT", claims);
    }
    setClaims(claims);
  }, [items]);

  return (
    <styled.Component>
      <styled.List>
        {Object.keys(claims).map((key) => {
          console.log(key);
          const claim = claims[key];
          return (
          <styled.ListItem>
            <h2>{ claim.name }</h2>
            <styled.List>
              {claim.gifts.map((item, index) => (
                <styled.ListItem key={ item.id }>
                  <GiftItem
                    unClaimHandler = { unClaimHandler }
                    index={ index }
                    currentUser={ currentUser }
                    claimer={ currentUser }
                    {...item}
                    />
              </styled.ListItem>
              ))}
            </styled.List>
          </styled.ListItem>
          );  
        })}
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

ClaimList.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
};

export default ClaimList;
