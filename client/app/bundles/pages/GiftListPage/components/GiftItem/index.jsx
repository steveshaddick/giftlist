import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser } from 'utilities/CurrentUserContext';

import * as layout from 'common/_styles/layout';
import * as styled from './_styles';

const GiftItem = (props) => {
  const {
    index,
    gift,
    claimHandler,
    unClaimHandler,
   } = props;
   const { title, description, priceHigh, priceLow, claimer } = gift;
   const currentUser = getCurrentUser();

   const isClaimed = claimer !== null;
   const currentUserClaimed = claimer && claimer.id === currentUser.id;

   const [ isExpanded, setIsExpanded ] = useState(false);

  return (
    <styled.Component isClaimed={ isClaimed } currentUserClaimed={ currentUserClaimed }>
      <layout.GridRow>
        <styled.SummaryRow>
          <styled.Title role="button" onClick={()=> {
            setIsExpanded(!isExpanded)
          }}>
            { title }
          </styled.Title>
          
          <styled.PriceContainer>
            { priceLow === priceHigh &&
              <styled.PriceContainer>
                <styled.Price>{ priceLow }</styled.Price>
              </styled.PriceContainer>
            }
            { priceLow !== priceHigh &&
              <styled.PriceContainer>
                <styled.Price>{ priceLow }</styled.Price> - <styled.Price>{ priceHigh }</styled.Price>
              </styled.PriceContainer>
            }
          </styled.PriceContainer>
        </styled.SummaryRow>

        { isExpanded && 
          <styled.Description dangerouslySetInnerHTML={{__html: description}} />
        }
      
        { isClaimed &&
          <styled.ClaimedRow>
            {currentUserClaimed &&
              <>
              <p>You are getting this.</p>
              <styled.ActionButton data-item-index={ index } onClick={ unClaimHandler }>Cancel</styled.ActionButton>
              </>
            }
            {!currentUserClaimed &&
              <p>{ claimer.name } is getting this.</p>
            }
          </styled.ClaimedRow>
        }

        { !isClaimed &&
          <styled.ActionRow>
            <styled.ActionButton data-item-index={ index } onClick={ claimHandler }>I'll get it</styled.ActionButton>
          </styled.ActionRow>
        }
      </layout.GridRow>
    </styled.Component>
  );
};

GiftItem.propTypes = {
};

export default GiftItem;
