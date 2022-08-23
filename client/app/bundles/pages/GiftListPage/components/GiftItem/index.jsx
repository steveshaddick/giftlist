import React, { useState } from 'react';
import PropTypes from 'prop-types';

import EditGift from 'common/components/EditGift';

import * as layout from 'common/_styles/layout';
import * as buttons from 'common/_styles/buttons';
import * as styled from './_styles';

const GiftItem = (props) => {
  const {
    index,
    gift,
    enableClaimed = true,
    currentUser,
    claimHandler,
    unClaimHandler,
    editHandler,
    deleteClickHandler,
   } = props;
   const { id: giftId, title, description, priceHigh, priceLow, claimer, owner, groupOwner } = gift;
   const { id: currentUserId } = currentUser;

   const isClaimed = claimer ? true : false;
   const currentUserClaimed = claimer?.id === currentUserId;
   const isGroupOwned = groupOwner ? true : false;

   const [ isExpanded, setIsExpanded ] = useState(false);
   const [ isEditing, setIsEditing ] = useState(false);


  const editClickHandler = () => {
    setIsEditing(true);
  }

  const saveEditingHandler = (giftData) => {
    setIsEditing(false);
    if (editHandler) {
      editHandler(giftData);
    }
  }

  const cancelEditingHandler = () => {
    setIsEditing(false);
  }

  return (
    <styled.Component
      data-gift-id={ giftId }
      data-item-index={ index }
      isClaimed={ isClaimed }
      currentUserClaimed={ currentUserClaimed }
      isGroupOwned={ isGroupOwned }
    >
      { isEditing
        ?
        <layout.GridRow>
          <EditGift
            gift={ gift }
            saveHandler={ saveEditingHandler }
            cancelHandler={ cancelEditingHandler }
          />
        </layout.GridRow>
        :
        <layout.GridRow>
          <styled.SummaryRow>
            <styled.TitleContainer>
              <styled.Title role="button" onClick={()=> {
                setIsExpanded(!isExpanded)
              }}>
                { title }
              </styled.Title>
              { isGroupOwned && owner.id == currentUserId &&
                <styled.GroupOwnedInfo>
                  (You added this.)
                </styled.GroupOwnedInfo>
              }
              { isGroupOwned && owner.id != currentUserId &&
                <styled.GroupOwnedInfo>
                  (Added by { owner.name })
                </styled.GroupOwnedInfo>
              }
            </styled.TitleContainer>
            { (priceLow > 0 || priceHigh > 0) &&
              <styled.PriceContainer>
                { priceLow === priceHigh
                  ?
                  <styled.PriceContainer>
                    <styled.Price>{ priceLow }</styled.Price>
                  </styled.PriceContainer>
                  :
                  <styled.PriceContainer>
                    <styled.Price>{ priceLow }</styled.Price> - <styled.Price>{ priceHigh }</styled.Price>
                  </styled.PriceContainer>
                }
              </styled.PriceContainer>
            }
          </styled.SummaryRow>

          { isExpanded && 
            <styled.Description dangerouslySetInnerHTML={{__html: description}} />
          }
        
          { isClaimed &&
            <styled.ClaimedRow>
              { currentUserClaimed
                ?
                <>
                  <p>You are getting this.</p>
                  <styled.ActionButton onClick={ unClaimHandler }>Cancel</styled.ActionButton>
                </>
                :
                <p>{ claimer.name } is getting this.</p>
              }
            </styled.ClaimedRow>
          }

          { (enableClaimed && !isClaimed) &&
            <styled.ActionRow>
              <styled.ActionButton onClick={ claimHandler }>I'll get it</styled.ActionButton>

            { isGroupOwned &&
              <styled.EditButtonContainer>
                <buttons.EditButton onClick={ editClickHandler }>Edit</buttons.EditButton>
                <buttons.DeleteButton onClick={ deleteClickHandler }>Delete</buttons.DeleteButton>
              </styled.EditButtonContainer>
            }
            </styled.ActionRow>
          }
        </layout.GridRow>
      }
    </styled.Component>
  );
};

GiftItem.propTypes = {
};

export default GiftItem;
