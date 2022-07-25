import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as styled from './_styles';

const GiftItem = (props) => {
  const {
    index,
    title,
    priceLow,
    priceHigh,
    description,
    claimHandler,
    unClaimHandler,
    claimer,
    currentUser,
   } = props;

   const isClaimed = claimer !== null;
   const currentUserClaimed = claimer && claimer.id === currentUser.id;

   const [ isExpanded, setIsExpanded ] = useState(false);

  return (
    <styled.Component isClaimed={ isClaimed } currentUserClaimed={ currentUserClaimed }>
      <styled.SummaryRow>
        <styled.Title role="button" onClick={()=> {
          setIsExpanded(!isExpanded)
        }}>
          { title }
        </styled.Title>
        
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
      </styled.SummaryRow>

      {isExpanded && 
        <styled.Description>
          { description }
        </styled.Description>
      }
    
    {isClaimed &&
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

    {!isClaimed &&
      <styled.ActionRow>
        <styled.ActionButton data-item-index={ index } onClick={ claimHandler }>I'll get it</styled.ActionButton>
      </styled.ActionRow>
    }

    </styled.Component>
  );
};

GiftItem.propTypes = {
};

export default GiftItem;
