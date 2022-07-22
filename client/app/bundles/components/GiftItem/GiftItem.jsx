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
    getItHandler
   } = props;

   const [ isExpanded, setIsExpanded ] = useState(false);

  return (
    <styled.Component>
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
    
    <styled.ActionRow>
      <styled.ActionButton data-item-index={ index } onClick={ getItHandler }>I'll get it</styled.ActionButton>
    </styled.ActionRow>

    </styled.Component>
  );
};

GiftItem.propTypes = {
};

export default GiftItem;
